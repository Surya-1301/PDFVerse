"use client";

import {
  ChangeEvent,
  CSSProperties,
  PointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import {
  ArrowLeft,
  Bold,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Eraser,
  Highlighter,
  Image as ImageIcon,
  Italic,
  MousePointer2,
  Redo2,
  Signature,
  Strikethrough,
  Type,
  Underline,
  Undo2,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

type Tool =
  | "select"
  | "text"
  | "highlight"
  | "draw"
  | "image"
  | "signature"
  | "eraser";

type ObjectType =
  | "text"
  | "highlight"
  | "draw"
  | "image"
  | "signature";

type Point = {
  x: number;
  y: number;
};

type TextMode = "inline" | "outside";

type EditorObject = {
  id: string;
  type: ObjectType;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;

  text?: string;
  textMode?: TextMode;
  fontFamily?: string;
  fontSize?: number;
  color?: string;

  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;

  /**
   * Existing PDF text metadata.
   *
   * PDF.js gives us the source text item's bounds in PDF coordinates.
   * We keep the original values so an edited/deleted text item can be
   * covered at its original location during export.
   */
  source?: "existing" | "new";
  originalText?: string;
  sourceX?: number;
  sourceY?: number;
  sourceWidth?: number;
  sourceHeight?: number;
  sourceFontSize?: number;
  sourceFontFamily?: string;
  sourceColor?: string;
  sourceBold?: boolean;
  sourceItalic?: boolean;
  sourceUnderline?: boolean;
  sourceStrike?: boolean;
  sourceRotation?: number;
  rotation?: number;
  deleted?: boolean;

  opacity?: number;

  points?: Point[];

  imageDataUrl?: string;
};

type PageInfo = {
  pageNumber: number;
  width: number;
  height: number;
};

type Props = {
  initialFile?: File | null;
  onBack?: () => void;
};

const pageDefault = {
  width: 595,
  height: 842,
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function cloneObjects(objects: EditorObject[]) {
  return objects.map((object) => ({
    ...object,
    points: object.points?.map((point) => ({
      ...point,
    })),
  }));
}

async function createBlankA4File() {
  // A4 = 210 × 297 mm = 595.28 × 841.89 PDF points.
  const pdf = await PDFDocument.create();

  pdf.addPage([595.28, 841.89]);

  const bytes = await pdf.save();

  // Convert Uint8Array<ArrayBufferLike> to a concrete ArrayBuffer
  // so TypeScript accepts it as a BlobPart/File input.
  const arrayBuffer = new ArrayBuffer(
    bytes.byteLength,
  );

  new Uint8Array(arrayBuffer).set(bytes);

  return new File(
    [arrayBuffer],
    "Blank-A4-Document.pdf",
    { type: "application/pdf" },
  );
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

function imageBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1];

  if (!base64) {
    throw new Error("Invalid image data");
  }

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");

  const safe =
    normalized.length === 6 ? normalized : "111827";

  return {
    r: parseInt(safe.slice(0, 2), 16) / 255,
    g: parseInt(safe.slice(2, 4), 16) / 255,
    b: parseInt(safe.slice(4, 6), 16) / 255,
  };
}


/**
 * Convert a PDF.js text item into editor coordinates.
 *
 * PDF.js keeps text item coordinates in the PDF coordinate system
 * (origin at the bottom-left). PDF.js viewport conversion is handled
 * through `convertToViewportPoint()` with a transform fallback so the
 * editor works across PDF.js versions. This keeps the editor aligned
 * with the rendered canvas.
 */
function textItemToEditorObject(
  pdfjs: any,
  pdfPage: any,
  viewport: any,
  pageNumber: number,
  item: any,
  styleInfo: any,
): EditorObject | null {
  const text = typeof item?.str === "string" ? item.str : "";

  // Empty whitespace fragments are not useful editable objects.
  if (!text.trim()) {
    return null;
  }

  const transform = Array.isArray(item?.transform)
    ? item.transform
    : null;

  if (!transform || transform.length < 6) {
    return null;
  }

  const x = Number(transform[4]) || 0;
  const y = Number(transform[5]) || 0;
  const width = Math.max(
    4,
    Number(item.width) || 0,
  );

  const rawFontSize = Math.sqrt(
    Math.pow(Number(transform[2]) || 0, 2) +
      Math.pow(Number(transform[3]) || 0, 2),
  );

  const fontSize = Math.max(
    6,
    Math.min(
      120,
      rawFontSize ||
        Number(item.height) ||
        12,
    ),
  );

  const pdfHeight = Math.max(
    Number(item.height) || 0,
    fontSize * 1.15,
    8,
  );

  /*
   * PDF.js has changed the viewport helper API across versions.
   * Some installed versions do not expose
   * `convertToViewportRectangle()`, which previously caused the whole
   * editor to fail while extracting page text.
   *
   * Use convertToViewportPoint() when available and fall back to the
   * viewport transform. This works across the PDF.js versions used by
   * PDFVerse and keeps the existing text coordinates aligned with the
   * rendered page.
   */
  const convertPdfPointToViewport = (
    pdfX: number,
    pdfY: number,
  ): [number, number] => {
    if (
      typeof viewport?.convertToViewportPoint ===
      "function"
    ) {
      const point =
        viewport.convertToViewportPoint(
          pdfX,
          pdfY,
        );

      return [
        Number(point?.[0]) || 0,
        Number(point?.[1]) || 0,
      ];
    }

    const transform = Array.isArray(
      viewport?.transform,
    )
      ? viewport.transform
      : null;

    if (transform?.length >= 6) {
      const a = Number(transform[0]) || 0;
      const b = Number(transform[1]) || 0;
      const c = Number(transform[2]) || 0;
      const d = Number(transform[3]) || 0;
      const e = Number(transform[4]) || 0;
      const f = Number(transform[5]) || 0;

      return [
        a * pdfX + c * pdfY + e,
        b * pdfX + d * pdfY + f,
      ];
    }

    // Final fallback for an unexpected viewport implementation.
    return [pdfX, pdfY];
  };

  const topLeft = convertPdfPointToViewport(
    x,
    y + pdfHeight,
  );

  const bottomRight = convertPdfPointToViewport(
    x + width,
    y,
  );

  const left = Math.min(
    topLeft[0],
    bottomRight[0],
  );
  const top = Math.min(
    topLeft[1],
    bottomRight[1],
  );
  const right = Math.max(
    topLeft[0],
    bottomRight[0],
  );
  const bottom = Math.max(
    topLeft[1],
    bottomRight[1],
  );

  const editorWidth = Math.max(
    8,
    right - left,
  );
  const editorHeight = Math.max(
    10,
    bottom - top,
  );

  const familyName = String(
    styleInfo?.fontFamily ||
      item?.fontName ||
      "Helvetica",
  );

  const lowerFamily = familyName.toLowerCase();

  const fontFamily =
    lowerFamily.includes("courier") ||
    lowerFamily.includes("mono")
      ? "Courier"
      : lowerFamily.includes("times") ||
          lowerFamily.includes("serif")
        ? "Times-Roman"
        : "Helvetica";

  const lowerFontName = String(
    item?.fontName || "",
  ).toLowerCase();

  const bold =
    lowerFontName.includes("bold") ||
    lowerFontName.includes("black") ||
    lowerFontName.includes("heavy");

  const italic =
    lowerFontName.includes("italic") ||
    lowerFontName.includes("oblique");

  // Rotation is useful for normal PDF text and harmless for 0° text.
  const rotation =
    (Math.atan2(
      Number(transform[1]) || 0,
      Number(transform[0]) || 0,
    ) *
      180) /
    Math.PI;

  return {
    id: createId("pdf-text"),
    type: "text",
    page: pageNumber,
    x: left,
    y: top,
    width: editorWidth,
    height: editorHeight,
    text,
    fontFamily,
    fontSize,
    color: "#111827",
    bold,
    italic,
    underline: false,
    strike: false,
    source: "existing",
    // Existing PDF text is always edited inline.
    textMode: "inline",
    originalText: text,
    sourceX: left,
    sourceY: top,
    sourceWidth: editorWidth,
    sourceHeight: editorHeight,
    sourceFontSize: fontSize,
    sourceFontFamily: fontFamily,
    sourceColor: "#111827",
    sourceBold: bold,
    sourceItalic: italic,
    sourceUnderline: false,
    sourceStrike: false,
    sourceRotation: rotation,
    rotation,
  };
}

function isExistingTextEdited(
  object: EditorObject,
) {
  if (object.source !== "existing") {
    return false;
  }

  return (
    Boolean(object.deleted) ||
    object.text !== object.originalText ||
    Math.abs(
      (object.x || 0) -
        (object.sourceX || 0),
    ) > 0.01 ||
    Math.abs(
      (object.y || 0) -
        (object.sourceY || 0),
    ) > 0.01 ||
    Math.abs(
      (object.width || 0) -
        (object.sourceWidth || 0),
    ) > 0.01 ||
    Math.abs(
      (object.height || 0) -
        (object.sourceHeight || 0),
    ) > 0.01 ||
    (object.fontSize || 0) !==
      (object.sourceFontSize || 0) ||
    (object.fontFamily || "") !==
      (object.sourceFontFamily || "") ||
    (object.color || "") !==
      (object.sourceColor || "") ||
    !!object.bold !==
      !!object.sourceBold ||
    !!object.italic !==
      !!object.sourceItalic ||
    !!object.underline !==
      !!object.sourceUnderline ||
    !!object.strike !==
      !!object.sourceStrike ||
    Math.abs(
      (object.rotation || 0) -
        (object.sourceRotation || 0),
    ) > 0.01
  );
}

function inferTextObjectsFromPdfPage(
  pdfjs: any,
  pdfPage: any,
  viewport: any,
  pageNumber: number,
) {
  return pdfPage
    .getTextContent({
      normalizeWhitespace: true,
      disableCombineTextItems: false,
    })
    .then((content: any) => {
      const items = Array.isArray(content?.items)
        ? content.items
        : [];

      const styles =
        content?.styles || {};

      const detected: EditorObject[] = [];

      for (const item of items) {
        const styleInfo =
          styles?.[item?.fontName] ||
          {};

        const object =
          textItemToEditorObject(
            pdfjs,
            pdfPage,
            viewport,
            pageNumber,
            item,
            styleInfo,
          );

        if (object) {
          detected.push(object);
        }
      }

      return detected;
    });
}

export default function LivePdfEditor({
  initialFile = null,
  onBack,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoOpenedBlankRef = useRef(false);

  const [file, setFile] = useState<File | null>(initialFile);
  const [bytes, setBytes] = useState<ArrayBuffer | null>(null);

  const [pages, setPages] = useState<PageInfo[]>([]);
  const [page, setPage] = useState(1);

  const [zoom, setZoom] = useState(1);

  const [tool, setTool] = useState<Tool>("select");
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  // Separate from selection so clicking existing PDF text immediately
  // opens the inline editor.
  const [editingTextId, setEditingTextId] =
    useState<string | null>(null);

  const [name, setName] = useState("Untitled PDF");

  const [status, setStatus] = useState<
    "saved" | "saving" | "unsaved"
  >("saved");

  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  const [font, setFont] = useState("Helvetica");
  const [size, setSize] = useState(16);
  const [color, setColor] = useState("#111827");

  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strike, setStrike] = useState(false);

  const [signature, setSignature] =
    useState("Your Signature");

  const [history, setHistory] = useState<EditorObject[][]>([
    [],
  ]);

  const [historyIndex, setHistoryIndex] = useState(0);

  const [drag, setDrag] = useState<{
    id: string;
    start: Point;
    origin: Point;
  } | null>(null);

  const [drawing, setDrawing] = useState<Point[]>([]);

  const currentPage = useMemo(
    () =>
      pages.find(
        (item) => item.pageNumber === page,
      ) || pageDefault,
    [pages, page],
  );

  const pageObjects = useMemo(
    () =>
      objects.filter(
        (object) =>
          object.page === page &&
          !object.deleted,
      ),
    [objects, page],
  );

  useEffect(() => {
    setEditingTextId(null);
  }, [page]);

  const selectedObject = useMemo(
    () =>
      objects.find(
        (object) => object.id === selected,
      ) || null,
    [objects, selected],
  );

  /*
   * ---------------------------------------------------------
   * HISTORY
   * ---------------------------------------------------------
   */

  const commit = useCallback(
    (next: EditorObject[]) => {
      setObjects(next);
      setStatus("unsaved");

      setHistory((currentHistory) => {
        const nextHistory = [
          ...currentHistory.slice(0, historyIndex + 1),
          cloneObjects(next),
        ];

        return nextHistory.slice(-50);
      });

      setHistoryIndex((currentIndex) =>
        Math.min(currentIndex + 1, 49),
      );
    },
    [historyIndex],
  );

  const undo = useCallback(() => {
    if (historyIndex <= 0) {
      return;
    }

    const nextIndex = historyIndex - 1;

    setObjects(cloneObjects(history[nextIndex]));
    setHistoryIndex(nextIndex);
    setSelected(null);
    setStatus("unsaved");
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) {
      return;
    }

    const nextIndex = historyIndex + 1;

    setObjects(cloneObjects(history[nextIndex]));
    setHistoryIndex(nextIndex);
    setSelected(null);
    setStatus("unsaved");
  }, [history, historyIndex]);

  /*
   * ---------------------------------------------------------
   * LOAD PDF
   * ---------------------------------------------------------
   */

  const load = useCallback(
    async (selectedFile: File) => {
      try {
        setError("");
        setLoading(true);

        if (
          selectedFile.type &&
          selectedFile.type !== "application/pdf" &&
          !selectedFile.name
            .toLowerCase()
            .endsWith(".pdf")
        ) {
          throw new Error("Please select a PDF file.");
        }

        const data =
          await selectedFile.arrayBuffer();

        /*
         * IMPORTANT:
         *
         * pdfjs-dist is dynamically imported.
         * This prevents pdf.js from being evaluated
         * during server-side rendering.
         */
        const pdfjs = await import("pdfjs-dist");

        pdfjs.GlobalWorkerOptions.workerSrc =
          `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const pdf =
          await pdfjs.getDocument({
            data: data.slice(0),
          }).promise;

        const nextPages: PageInfo[] = [];
        const detectedObjects: EditorObject[] = [];

        for (
          let index = 1;
          index <= pdf.numPages;
          index += 1
        ) {
          const pdfPage =
            await pdf.getPage(index);

          const viewport =
            pdfPage.getViewport({
              scale: 1,
            });

          nextPages.push({
            pageNumber: index,
            width: viewport.width,
            height: viewport.height,
          });

          /*
           * IMPORTANT:
           * Build editable objects from the PDF's real text layer.
           *
           * This is what makes existing PDF text selectable/editable
           * instead of only allowing newly-added text.
           */
          try {
            const pageTextObjects =
              await inferTextObjectsFromPdfPage(
                pdfjs,
                pdfPage,
                viewport,
                index,
              );

            detectedObjects.push(
              ...pageTextObjects,
            );
          } catch (textError) {
            /*
             * Image-only/scanned pages do not have a native PDF text
             * layer. Keep opening the document; the normal annotation
             * tools still work on those pages.
             */
            console.warn(
              `Could not extract text from PDF page ${index}.`,
              textError,
            );
          }
        }

        setFile(selectedFile);
        setBytes(data);
        setPages(nextPages);

        setPage(1);
        setObjects(detectedObjects);

        setHistory([
          cloneObjects(detectedObjects),
        ]);
        setHistoryIndex(0);

        setSelected(null);

        setName(
          selectedFile.name.replace(
            /\.pdf$/i,
            "",
          ),
        );

        setStatus("saved");
      } catch (loadError) {
        console.error(loadError);

        setError(
          "Could not open this PDF. Please choose another PDF.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (initialFile) {
      void load(initialFile);
    }
  }, [initialFile, load]);

  /*
   * ---------------------------------------------------------
   * OPEN BLANK A4 DOCUMENT FROM THE MAIN PAGE
   * ---------------------------------------------------------
   *
   * The main PDFVerse page opens the editor with:
   *
   *   /pdf-editor?tool=pdf-editor&source=homepage&blank=true
   *
   * When that query parameter is present, skip the editor landing
   * screen and create/load a real one-page A4 PDF automatically.
   *
   * This uses the exact same `load()` pipeline as an uploaded PDF,
   * so rendering, text tools, annotations, undo/redo and export all
   * work normally on the blank document.
   */
  useEffect(() => {
    if (initialFile || autoOpenedBlankRef.current) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const shouldOpenBlank = params.get("blank") === "true";

    if (!shouldOpenBlank) {
      return;
    }

    autoOpenedBlankRef.current = true;

    void (async () => {
      try {
        setError("");
        const blankFile = await createBlankA4File();
        await load(blankFile);
      } catch (blankError) {
        console.error(
          "Could not automatically create blank A4 PDF:",
          blankError,
        );

        setError(
          "Could not create a blank A4 document. Please try again.",
        );
        autoOpenedBlankRef.current = false;
      }
    })();
  }, [initialFile, load]);

  /*
   * ---------------------------------------------------------
   * RENDER PDF PAGE
   * ---------------------------------------------------------
   */

  const render = useCallback(async () => {
    if (!bytes || !canvasRef.current) {
      return;
    }

    try {
      const pdfjs = await import("pdfjs-dist");

      pdfjs.GlobalWorkerOptions.workerSrc =
        `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

      const pdf =
        await pdfjs.getDocument({
          data: bytes.slice(0),
        }).promise;

      const pdfPage =
        await pdf.getPage(page);

      const viewport =
        pdfPage.getViewport({
          scale: zoom,
        });

      const canvas = canvasRef.current;

      const context =
        canvas.getContext("2d");

      if (!context) {
        return;
      }

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      canvas.style.width =
        `${viewport.width}px`;

      canvas.style.height =
        `${viewport.height}px`;

      /*
       * IMPORTANT:
       *
       * pdfjs-dist requires `canvas` in RenderParameters
       * in the current version.
       */
      await pdfPage.render({
        canvas,
        canvasContext: context,
        viewport,
      } as never).promise;
    } catch (renderError) {
      console.error(renderError);

      setError(
        "Could not render this page.",
      );
    }
  }, [bytes, page, zoom]);

  useEffect(() => {
    void render();
  }, [render]);

  /*
   * ---------------------------------------------------------
   * POINTER COORDINATES
   * ---------------------------------------------------------
   */

  const point = (
    event: PointerEvent<HTMLDivElement>,
  ): Point | null => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const rect =
      canvas.getBoundingClientRect();

    return {
      x:
        (event.clientX - rect.left) /
        zoom,
      y:
        (event.clientY - rect.top) /
        zoom,
    };
  };

  /*
   * ---------------------------------------------------------
   * ADD TEXT
   * ---------------------------------------------------------
   */

  function addText(position: Point) {
    const object: EditorObject = {
      id: createId("text"),
      type: "text",
      page,

      x: position.x,
      y: position.y,

      width: 230,
      height: Math.max(
        30,
        size * 1.5,
      ),

      // New text is automatically an outside text box.
      // Clicking existing PDF text uses inline editing automatically.
      text: "",
      textMode: "outside",

      fontFamily: font,
      fontSize: size,
      color,

      bold,
      italic,
      underline,
      strike,
      source: "new",
    };

    commit([
      ...objects,
      object,
    ]);

    setSelected(object.id);
    setEditingTextId(object.id);
    setTool("select");
  }

  /*
   * ---------------------------------------------------------
   * HIGHLIGHT
   * ---------------------------------------------------------
   */

  function addHighlight(position: Point) {
    const object: EditorObject = {
      id: createId("highlight"),
      type: "highlight",
      page,

      x: position.x,
      y: position.y,

      width: 190,
      height: 24,

      opacity: 0.38,
      source: "new",
    };

    commit([
      ...objects,
      object,
    ]);

    setSelected(object.id);
    setTool("select");
  }

  /*
   * ---------------------------------------------------------
   * SIGNATURE
   * ---------------------------------------------------------
   */

  function addSignature(position: Point) {
    const object: EditorObject = {
      id: createId("signature"),
      type: "signature",
      page,

      x: position.x,
      y: position.y,

      width: 230,
      height: 65,

      text: signature,

      fontFamily: "Times-Roman",
      fontSize: 30,

      color,

      italic: true,
      source: "new",
    };

    commit([
      ...objects,
      object,
    ]);

    setSelected(object.id);
    setTool("select");
  }

  /*
   * ---------------------------------------------------------
   * REMOVE
   * ---------------------------------------------------------
   */

  function remove(idToRemove: string) {
    const target = objects.find(
      (object) => object.id === idToRemove,
    );

    if (!target) {
      return;
    }

    if (target.source === "existing") {
      /*
       * Do not throw the source text object away. Keeping it marked as
       * deleted lets exportPdf cover the original PDF text at the exact
       * source location.
       */
      commit(
        objects.map((object) =>
          object.id === idToRemove
            ? {
                ...object,
                deleted: true,
              }
            : object,
        ),
      );
    } else {
      commit(
        objects.filter(
          (object) =>
            object.id !== idToRemove,
        ),
      );
    }

    setSelected(null);
    setEditingTextId(null);
    setStatus("unsaved");
  }

  /*
   * ---------------------------------------------------------
   * UPDATE OBJECT
   * ---------------------------------------------------------
   */

  function update(
    idToUpdate: string,
    patch: Partial<EditorObject>,
    historyCommit = false,
  ) {
    const next = objects.map(
      (object) =>
        object.id === idToUpdate
          ? {
              ...object,
              ...patch,
            }
          : object,
    );

    setObjects(next);
    setStatus("unsaved");

    if (historyCommit) {
      setHistory((currentHistory) =>
        [
          ...currentHistory.slice(
            0,
            historyIndex + 1,
          ),
          cloneObjects(next),
        ].slice(-50),
      );

      setHistoryIndex(
        (currentIndex) =>
          Math.min(
            currentIndex + 1,
            49,
          ),
      );
    }
  }

  /*
   * ---------------------------------------------------------
   * IMAGE
   * ---------------------------------------------------------
   */

  function imagePicked(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile =
      event.target.files?.[0];

    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      if (
        typeof reader.result !==
        "string"
      ) {
        return;
      }

      const object: EditorObject = {
        id: createId("image"),
        type: "image",
        page,

        x: 100,
        y: 100,

        width: 220,
        height: 160,

        imageDataUrl:
          reader.result,
        source: "new",
      };

      commit([
        ...objects,
        object,
      ]);

      setSelected(object.id);
      setTool("select");
    };

    reader.readAsDataURL(
      selectedFile,
    );
  }

  /*
   * ---------------------------------------------------------
   * POINTER DOWN
   * ---------------------------------------------------------
   */

  function pointerDown(
    event: PointerEvent<HTMLDivElement>,
  ) {
    const position = point(event);

    if (!position) {
      return;
    }

    /*
     * Robust PDF-text hit testing.
     *
     * PDF.js text items are represented as transparent HTML hit areas.
     * We also test the click coordinates here so existing PDF text can
     * be edited even when the browser event lands on the canvas layer.
     */
    if (
      tool === "select" ||
      tool === "text"
    ) {
      const existingText =
        [...pageObjects]
          .reverse()
          .find((object) => {
            if (
              object.type !== "text" ||
              object.source !== "existing"
            ) {
              return false;
            }

            const padding = Math.max(8, (object.fontSize || 16) * 0.35);

            return (
              position.x >=
                object.x - padding &&
              position.x <=
                object.x +
                  object.width +
                  padding &&
              position.y >=
                object.y - padding &&
              position.y <=
                object.y +
                  object.height +
                  padding
            );
          });

      if (existingText) {
        setSelected(existingText.id);
        setEditingTextId(existingText.id);
        setTool("select");
        return;
      }
    }

    if (tool === "text") {
      addText(position);
      return;
    }

    if (tool === "highlight") {
      addHighlight(position);
      return;
    }

    if (tool === "signature") {
      addSignature(position);
      return;
    }

    if (tool === "draw") {
      setDrawing([position]);
      return;
    }

    setSelected(null);
    setEditingTextId(null);
  }

  /*
   * ---------------------------------------------------------
   * OBJECT POINTER DOWN
   * ---------------------------------------------------------
   */

  function objectDown(
    event: PointerEvent<HTMLDivElement>,
    object: EditorObject,
  ) {
    event.stopPropagation();

    if (tool === "eraser") {
      remove(object.id);
      return;
    }

    setSelected(object.id);

    if (tool !== "select") {
      return;
    }

    const position = point(event);

    if (!position) {
      return;
    }

    setDrag({
      id: object.id,

      start: position,

      origin: {
        x: object.x,
        y: object.y,
      },
    });
  }

  /*
   * ---------------------------------------------------------
   * POINTER MOVE
   * ---------------------------------------------------------
   */

  function pointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    const position = point(event);

    if (!position) {
      return;
    }

    if (
      tool === "draw" &&
      drawing.length
    ) {
      setDrawing((current) => [
        ...current,
        position,
      ]);

      return;
    }

    if (!drag) {
      return;
    }

    setObjects((current) =>
      current.map((object) =>
        object.id === drag.id
          ? {
              ...object,

              x:
                drag.origin.x +
                position.x -
                drag.start.x,

              y:
                drag.origin.y +
                position.y -
                drag.start.y,
            }
          : object,
      ),
    );

    setStatus("unsaved");
  }

  /*
   * ---------------------------------------------------------
   * POINTER UP
   * ---------------------------------------------------------
   */

  function pointerUp() {
    if (
      tool === "draw" &&
      drawing.length > 1
    ) {
      const minX = Math.min(
        ...drawing.map(
          (item) => item.x,
        ),
      );

      const minY = Math.min(
        ...drawing.map(
          (item) => item.y,
        ),
      );

      const maxX = Math.max(
        ...drawing.map(
          (item) => item.x,
        ),
      );

      const maxY = Math.max(
        ...drawing.map(
          (item) => item.y,
        ),
      );

      const object: EditorObject = {
        id: createId("draw"),
        type: "draw",
        page,

        x: minX,
        y: minY,

        width: Math.max(
          2,
          maxX - minX,
        ),

        height: Math.max(
          2,
          maxY - minY,
        ),

        points: drawing.map(
          (item) => ({
            x: item.x - minX,
            y: item.y - minY,
          }),
        ),

        color,
        source: "new",
      };

      commit([
        ...objects,
        object,
      ]);

      setSelected(object.id);
      setTool("select");
    } else if (drag) {
      setHistory((currentHistory) =>
        [
          ...currentHistory.slice(
            0,
            historyIndex + 1,
          ),
          cloneObjects(objects),
        ].slice(-50),
      );

      setHistoryIndex(
        (currentIndex) =>
          Math.min(
            currentIndex + 1,
            49,
          ),
      );
    }

    setDrawing([]);
    setDrag(null);
  }

  /*
   * ---------------------------------------------------------
   * KEYBOARD
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleKeyboard =
      (event: KeyboardEvent) => {
        const modifier =
          event.ctrlKey ||
          event.metaKey;

        if (
          modifier &&
          event.key.toLowerCase() ===
            "z"
        ) {
          event.preventDefault();

          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }

          return;
        }

        if (
          modifier &&
          event.key.toLowerCase() ===
            "y"
        ) {
          event.preventDefault();
          redo();

          return;
        }

        if (
          (event.key === "Delete" ||
            event.key === "Backspace") &&
          selected &&
          !(
            event.target as HTMLElement
          )?.matches(
            "input,textarea",
          )
        ) {
          remove(selected);
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
  }, [
    redo,
    undo,
    selected,
    objects,
  ]);

  /*
   * ---------------------------------------------------------
   * LOCAL AUTOSAVE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!file) {
      return;
    }

    const storageKey =
      `pdfverse-editor:${file.name}:${file.size}:${file.lastModified}`;

    const timer =
      window.setTimeout(() => {
        try {
          setStatus("saving");

          localStorage.setItem(
            storageKey,
            JSON.stringify({
              name,
              objects,
            }),
          );

          window.setTimeout(
            () => setStatus("saved"),
            250,
          );
        } catch {
          setStatus("unsaved");
        }
      }, 500);

    return () =>
      clearTimeout(timer);
  }, [
    file,
    name,
    objects,
  ]);

  /*
   * ---------------------------------------------------------
   * EXPORT PDF
   * ---------------------------------------------------------
   */

  /**
   * Convert an existing PDF text object's editor/source rectangle into
   * pdf-lib page coordinates.
   *
   * Existing text is detected from PDF.js at scale 1. The actual PDF page
   * can have a slightly different effective size because of rotation/crop
   * boxes, so use the loaded page dimensions as a scale guard. This is
   * especially important for DELETE: the whiteout must land exactly over
   * the original PDF text or the original glyphs remain visible.
   */
  function getExistingTextPdfRect(
    object: EditorObject,
    pdfPage: any,
    pageInfo?: PageInfo,
  ) {
    const { width: pdfWidth, height: pdfHeight } =
      pdfPage.getSize();

    const viewportWidth =
      Number(pageInfo?.width) || pdfWidth;
    const viewportHeight =
      Number(pageInfo?.height) || pdfHeight;

    const scaleX =
      viewportWidth > 0
        ? pdfWidth / viewportWidth
        : 1;

    const scaleY =
      viewportHeight > 0
        ? pdfHeight / viewportHeight
        : 1;

    const sourceX =
      Number(object.sourceX ?? object.x) || 0;
    const sourceY =
      Number(object.sourceY ?? object.y) || 0;
    const sourceWidth =
      Number(object.sourceWidth ?? object.width) || 0;
    const sourceHeight =
      Number(object.sourceHeight ?? object.height) || 0;

    // PDF.js editor coordinates are top-left based; pdf-lib coordinates
    // are bottom-left based.
    const x =
      sourceX * scaleX;
    const y =
      pdfHeight -
      (sourceY + sourceHeight) * scaleY;
    const width =
      sourceWidth * scaleX;
    const height =
      sourceHeight * scaleY;

    return {
      x,
      y,
      width: Math.max(width, 1),
      height: Math.max(height, 1),
    };
  }

  function whiteoutExistingText(
    pdfPage: any,
    object: EditorObject,
    pageInfo?: PageInfo,
  ) {
    const rect =
      getExistingTextPdfRect(
        object,
        pdfPage,
        pageInfo,
      );

    // A small padding catches glyphs that extend outside PDF.js's nominal
    // text-item rectangle (common with descenders and embedded fonts).
    const paddingX = Math.max(
      1.5,
      Math.min(5, rect.height * 0.12),
    );
    const paddingY = Math.max(
      1.5,
      Math.min(5, rect.height * 0.12),
    );

    pdfPage.drawRectangle({
      x: Math.max(
        0,
        rect.x - paddingX,
      ),
      y: Math.max(
        0,
        rect.y - paddingY,
      ),
      width: Math.min(
        rect.width + paddingX * 2,
        pdfPage.getSize().width -
          Math.max(
            0,
            rect.x - paddingX,
          ),
      ),
      height: Math.min(
        rect.height + paddingY * 2,
        pdfPage.getSize().height -
          Math.max(
            0,
            rect.y - paddingY,
          ),
      ),
      color: rgb(1, 1, 1),
      borderWidth: 0,
    });
  }

  async function exportPdf() {
    if (!bytes) {
      setError("Open a PDF first.");
      return;
    }

    try {
      setExporting(true);
      setError("");

      const pdf =
        await PDFDocument.load(
          bytes.slice(0),
        );

      const helvetica =
        await pdf.embedFont(
          StandardFonts.Helvetica,
        );

      const boldFont =
        await pdf.embedFont(
          StandardFonts.HelveticaBold,
        );

      const italicFont =
        await pdf.embedFont(
          StandardFonts.HelveticaOblique,
        );

      const timesRoman =
        await pdf.embedFont(
          StandardFonts.TimesRoman,
        );

      const timesBold =
        await pdf.embedFont(
          StandardFonts.TimesRomanBold,
        );

      const timesItalic =
        await pdf.embedFont(
          StandardFonts.TimesRomanItalic,
        );

      const timesBoldItalic =
        await pdf.embedFont(
          StandardFonts.TimesRomanBoldItalic,
        );

      const courier =
        await pdf.embedFont(
          StandardFonts.Courier,
        );

      for (
        let index = 0;
        index < pdf.getPageCount();
        index += 1
      ) {
        const pdfPage =
          pdf.getPage(index);

        const pageNumber =
          index + 1;

        const { height } =
          pdfPage.getSize();

        const pageObjectsForExport =
          objects.filter(
            (object) =>
              object.page === pageNumber,
          );

        /*
         * ---------------------------------------------------------
         * 1. REPLACE / DELETE EXISTING PDF TEXT
         * ---------------------------------------------------------
         *
         * pdf-lib does not expose a high-level API for changing an
         * arbitrary text-showing operator already inside a PDF content
         * stream. For browser-side editing we therefore use the same
         * practical approach used by many lightweight PDF editors:
         *
         *   original text -> whiteout its original bounds
         *   edited text   -> draw the replacement at the new bounds
         *
         * The result is a real, downloadable PDF with the old visible
         * content removed and the replacement written into the page.
         */
        for (
          const object of
            pageObjectsForExport
        ) {
          if (
            object.source !==
              "existing" ||
            !isExistingTextEdited(
              object,
            )
          ) {
            continue;
          }

          const sourceX =
            object.sourceX ??
            object.x;

          const sourceY =
            object.sourceY ??
            object.y;

          const sourceWidth =
            object.sourceWidth ??
            object.width;

          const sourceHeight =
            object.sourceHeight ??
            object.height;

          whiteoutExistingText(
            pdfPage,
            object,
            pages[index],
          );
        }

        /*
         * ---------------------------------------------------------
         * 2. DRAW EDITOR OBJECTS
         * ---------------------------------------------------------
         */
        for (
          const object of
            pageObjectsForExport
        ) {
          /*
           * A deleted existing text item has already been whiteouted
           * above. It must not be drawn again.
           */
          if (
            object.deleted
          ) {
            continue;
          }

          const x = object.x;

          const y =
            height -
            object.y -
            object.height;

          if (
            object.type ===
              "text" ||
            object.type ===
              "signature"
          ) {
            let fontToUse;

            if (
              object.type ===
              "signature"
            ) {
              fontToUse =
                timesItalic;
            } else if (
              object.fontFamily ===
              "Times-Roman"
            ) {
              if (
                object.bold &&
                object.italic
              ) {
                fontToUse =
                  timesBoldItalic;
              } else if (
                object.bold
              ) {
                fontToUse =
                  timesBold;
              } else if (
                object.italic
              ) {
                fontToUse =
                  timesItalic;
              } else {
                fontToUse =
                  timesRoman;
              }
            } else if (
              object.fontFamily ===
              "Courier"
            ) {
              fontToUse =
                courier;
            } else if (
              object.bold
            ) {
              fontToUse =
                boldFont;
            } else if (
              object.italic
            ) {
              fontToUse =
                italicFont;
            } else {
              fontToUse =
                helvetica;
            }

            const fontSize =
              object.fontSize ||
              16;

            const text =
              object.text || "";

            /*
             * Existing source text is only redrawn when it was actually
             * edited. New text/signatures are always drawn.
             */
            if (
              object.source ===
                "existing" &&
              (
                Boolean(object.deleted) ||
                !isExistingTextEdited(
                  object,
                )
              )
            ) {
              continue;
            }

            // If the user erased every character from an existing PDF text
            // item, the source glyphs have already been whiteouted above.
            // Do not draw an empty replacement text object.
            if (
              object.source === "existing" &&
              !(object.text ?? "").trim()
            ) {
              continue;
            }

            const objectColor =
              object.color ||
              "#111827";

            const {
              r,
              g,
              b,
            } =
              hexToRgb(
                objectColor,
              );

            if (
              object.source === "new" &&
              object.textMode === "outside"
            ) {
              pdfPage.drawRectangle({
                x: Math.max(0, x - 2),
                y: Math.max(0, y - 4),
                width: Math.max(
                  object.width + 4,
                  8,
                ),
                height: Math.max(
                  object.height + 8,
                  fontSize + 8,
                ),
                color: rgb(1, 1, 1),
                borderWidth: 0,
              });
            }

            pdfPage.drawText(
              text,
              {
                x,
                y,
                size: fontSize,
                font: fontToUse,
                color: rgb(
                  r,
                  g,
                  b,
                ),
                rotate:
                  object.rotation
                    ? degrees(
                        object.rotation,
                      )
                    : undefined,
              },
            );

            const textWidth =
              fontToUse.widthOfTextAtSize(
                text,
                fontSize,
              );

            if (
              object.underline
            ) {
              pdfPage.drawLine({
                start: {
                  x,
                  y: y - 2,
                },

                end: {
                  x:
                    x +
                    textWidth,
                  y: y - 2,
                },

                thickness: 1,

                color: rgb(
                  r,
                  g,
                  b,
                ),
              });
            }

            if (
              object.strike
            ) {
              pdfPage.drawLine({
                start: {
                  x,
                  y:
                    y +
                    fontSize *
                      0.35,
                },

                end: {
                  x:
                    x +
                    textWidth,

                  y:
                    y +
                    fontSize *
                      0.35,
                },

                thickness: 1,

                color: rgb(
                  r,
                  g,
                  b,
                ),
              });
            }
          }

          /*
           * HIGHLIGHT
           */
          else if (
            object.type ===
            "highlight"
          ) {
            pdfPage.drawRectangle({
              x,
              y,

              width:
                object.width,

              height:
                object.height,

              color: rgb(
                1,
                0.9,
                0.1,
              ),

              opacity:
                object.opacity ??
                0.38,
            });
          }

          /*
           * DRAWING
           */
          else if (
            object.type ===
              "draw" &&
            object.points &&
            object.points.length >
              1
          ) {
            const {
              r,
              g,
              b,
            } = hexToRgb(
              object.color ||
                "#111827",
            );

            for (
              let pointIndex = 1;
              pointIndex <
              object.points
                .length;
              pointIndex += 1
            ) {
              const first =
                object.points[
                  pointIndex - 1
                ];

              const second =
                object.points[
                  pointIndex
                ];

              pdfPage.drawLine({
                start: {
                  x:
                    object.x +
                    first.x,

                  y:
                    height -
                    object.y -
                    first.y,
                },

                end: {
                  x:
                    object.x +
                    second.x,

                  y:
                    height -
                    object.y -
                    second.y,
                },

                thickness: 2,

                color: rgb(
                  r,
                  g,
                  b,
                ),
              });
            }
          }

          /*
           * IMAGE
           */
          else if (
            object.type ===
              "image" &&
            object.imageDataUrl
          ) {
            const data =
              imageBytes(
                object.imageDataUrl,
              );

            const image =
              object.imageDataUrl.startsWith(
                "data:image/png",
              )
                ? await pdf.embedPng(
                    data,
                  )
                : await pdf.embedJpg(
                    data,
                  );

            pdfPage.drawImage(
              image,
              {
                x,
                y,

                width:
                  object.width,

                height:
                  object.height,
              },
            );
          }
        }
      }

      const output =
        await pdf.save();

      const blobBytes =
        Uint8Array.from(output);

      const outputBlob =
        new Blob(
          [blobBytes],
          {
            type:
              "application/pdf",
          },
        );

      downloadBlob(
        outputBlob,
        `${
          name ||
          "document"
        }-edited.pdf`,
      );

      setStatus("saved");
    } catch (exportError) {
      console.error(
        exportError,
      );

      setError(
        "Could not export the edited PDF.",
      );
    } finally {
      setExporting(false);
    }
  }

  /*
   * ---------------------------------------------------------
   * OBJECT CSS
   * ---------------------------------------------------------
   */

  const objectStyle = (
    object: EditorObject,
  ): CSSProperties => ({
    left:
      object.x * zoom,

    top:
      object.y * zoom,

    width:
      object.width * zoom,

    height:
      object.height * zoom,

    position: "absolute",

    border:
      object.id === selected
        ? "1px solid #8b5cf6"
        : "1px solid transparent",

    boxShadow:
      object.id === selected
        ? "0 0 0 2px rgba(139,92,246,.15)"
        : undefined,

    zIndex:
      object.source ===
      "existing"
        ? 100
        : 30,
  });
  
  if (!file) {
    return (
      <section className="w-full px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-5">
            <button
              type="button"
              onClick={() => {
                if (onBack) {
                  onBack();
                  return;
                }

                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
              aria-label="Back to Tools"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </button>
          </div>
         

          {/* Professional editor landing card */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-[#101014] shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            {/* Ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-violet-600/[0.08] blur-3xl" />
              <div className="absolute -bottom-40 -right-40 h-[460px] w-[460px] rounded-full bg-fuchsia-600/[0.07] blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.035] blur-3xl" />
            </div>

            {/* Editor header */}
            <div className="relative flex items-center justify-between border-b border-white/[0.07] px-7 py-5 sm:px-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                  <ImageIcon className="h-6 w-6 text-violet-300" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    PDF Editor
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Professional PDF editing workspace
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-medium text-slate-400 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready
              </div>
            </div>

            {/* Main editor landing area */}
            <div className="relative px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <div className="mx-auto max-w-4xl text-center">
               

                {/* Tool title */}
                <h2 className="mt-7 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Live PDF Editor
                </h2>

                {/* Tool description */}
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                  Edit PDF text, scanned documents, images, highlights and
                  signatures directly in your browser.
                </p>

                {/* Capabilities */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    Edit existing text
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    OCR scanned PDFs
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    Add images
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-violet-400" />
                    Sign documents
                  </span>
                </div>

                {/* Open PDF */}
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={loading}
                    className="
                      inline-flex
                      h-14
                      min-w-[220px]
                      items-center
                      justify-center
                      gap-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-violet-600
                      to-purple-600
                      px-8
                      text-base
                      font-semibold
                      text-white
                      shadow-[0_15px_40px_rgba(124,58,237,0.28)]
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:shadow-[0_20px_50px_rgba(124,58,237,0.38)]
                      active:translate-y-0
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    <Upload className="h-5 w-5" />
                    {loading ? "Opening PDF..." : "Upload PDF File"}
                  </button>

                  <div className="mt-5 flex flex-col items-center">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={async () => {
                        try {
                          setError("");

                          const blankFile =
                            await createBlankA4File();

                          // Open the blank A4 PDF through the exact same
                          // pipeline used for uploaded PDFs.
                          await load(blankFile);
                        } catch (blankError) {
                          console.error(
                            "Could not create blank A4 PDF:",
                            blankError,
                          );

                          setError(
                            "Could not create a blank A4 document.",
                          );
                        }
                      }}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        text-lg
                        font-medium
                        text-violet-300
                        transition-colors
                        duration-200
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        sm:text-xl
                      "
                    >
                      or start with a blank document
                    </button>
                  </div>
                </div>

                {/* Loading */}
                {loading && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                    Opening PDF...
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mx-auto mt-6 max-w-xl rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Capabilities footer */}
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-3
                border-t
                border-white/5
                bg-black/10
                px-5
                py-5
                text-xs
                text-slate-500
                sm:text-sm
              "
            >
              <span className="transition hover:text-slate-300">
                ✓ Edit existing text
              </span>

              <span className="transition hover:text-slate-300">
                ✓ Add text &amp; images
              </span>

              <span className="transition hover:text-slate-300">
                ✓ Sign &amp; annotate
              </span>

              <span className="transition hover:text-slate-300">
                ✓ Download edited PDF
              </span>
            </div>
          </div>
        </div>

        {/* Hidden PDF input */}
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];

            event.target.value = "";

            if (selectedFile) {
              void load(selectedFile);
            }
          }}
        />
      </section>
    );
  }

  /*
   * ---------------------------------------------------------
   * FULL EDITOR
   * ---------------------------------------------------------
   */

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#09090b] text-white">
      {/* HEADER */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-[#111113] px-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (onBack) {
                onBack();
                return;
              }

              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="flex h-9 items-center gap-2 rounded-lg px-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Back to Tools"
            title="Back to Tools"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden text-xs font-medium sm:inline">
            </span>
          </button>

          <div className="h-7 w-px bg-white/10" />

          <div className="min-w-0">
            <input
              value={name}
              onChange={(event) => {
                setName(
                  event.target.value,
                );

                setStatus(
                  "unsaved",
                );
              }}
              className="max-w-[230px] truncate bg-transparent text-sm font-semibold outline-none"
            />

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              {status ===
              "saved" ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  Saved
                </>
              ) : status ===
                "saving" ? (
                "Saving..."
              ) : (
                "Unsaved changes"
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={undo}
            disabled={
              historyIndex === 0
            }
            className="hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30 sm:flex"
          >
            <Undo2 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={redo}
            disabled={
              historyIndex >=
              history.length - 1
            }
            className="hidden h-9 w-9 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30 sm:flex"
          >
            <Redo2 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={exportPdf}
            disabled={exporting}
            className="flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-3 text-xs font-semibold hover:bg-violet-500 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />

            {exporting
              ? "Exporting..."
              : "Download PDF"}
          </button>
        </div>
      </header>

      {/* TOOLBAR */}
      <div className="flex min-h-12 shrink-0 items-center justify-center gap-1 overflow-x-auto border-b border-white/10 bg-[#151517] px-2">
        <ToolButton
          label="Select"
          active={
            tool === "select"
          }
          onClick={() =>
            setTool("select")
          }
        >
          <MousePointer2 />
        </ToolButton>

        <ToolButton
          label="Text — existing text edits inline; blank areas add text"
          active={
            tool === "text"
          }
          onClick={() =>
            setTool("text")
          }
        >
          <Type />
        </ToolButton>

        <ToolButton
          label="Highlight"
          active={
            tool === "highlight"
          }
          onClick={() =>
            setTool("highlight")
          }
        >
          <Highlighter />
        </ToolButton>

        <ToolButton
          label="Draw"
          active={
            tool === "draw"
          }
          onClick={() =>
            setTool("draw")
          }
        >
          <Type />
        </ToolButton>

        <ToolButton
          label="Image"
          active={
            tool === "image"
          }
          onClick={() =>
            imageRef.current?.click()
          }
        >
          <ImageIcon />
        </ToolButton>

        <ToolButton
          label="Signature"
          active={
            tool === "signature"
          }
          onClick={() =>
            setTool("signature")
          }
        >
          <Signature />
        </ToolButton>

        <ToolButton
          label="Eraser"
          active={
            tool === "eraser"
          }
          onClick={() =>
            setTool("eraser")
          }
        >
          <Eraser />
        </ToolButton>

        <span className="mx-2 h-7 w-px bg-white/10" />

        <ToolButton
          label="Undo"
          onClick={undo}
          disabled={
            historyIndex === 0
          }
        >
          <Undo2 />
        </ToolButton>

        <ToolButton
          label="Redo"
          onClick={redo}
          disabled={
            historyIndex >=
            history.length - 1
          }
        >
          <Redo2 />
        </ToolButton>

        <span className="mx-2 h-7 w-px bg-white/10" />

        <ToolButton
          label="Zoom out"
          onClick={() =>
            setZoom((current) =>
              Math.max(
                0.5,
                Number(
                  (
                    current -
                    0.1
                  ).toFixed(2),
                ),
              ),
            )
          }
        >
          <ZoomOut />
        </ToolButton>

        <button
          type="button"
          onClick={() =>
            setZoom(1)
          }
          className="min-w-12 rounded-lg px-2 py-1.5 text-xs text-slate-300 hover:bg-white/10"
        >
          {Math.round(
            zoom * 100,
          )}
          %
        </button>

        <ToolButton
          label="Zoom in"
          onClick={() =>
            setZoom((current) =>
              Math.min(
                3,
                Number(
                  (
                    current +
                    0.1
                  ).toFixed(2),
                ),
              ),
            )
          }
        >
          <ZoomIn />
        </ToolButton>
      </div>

      {/* WORKSPACE */}
      <div className="flex min-h-0 flex-1">
        {/* PAGES */}
        <aside className="hidden w-28 shrink-0 overflow-y-auto border-r border-white/10 bg-[#111113] p-2 lg:block">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Pages
          </p>

          {pages.map(
            (pageInfo) => (
              <Thumbnail
                key={
                  pageInfo.pageNumber
                }
                bytes={bytes}
                pageNumber={
                  pageInfo.pageNumber
                }
                active={
                  page ===
                  pageInfo.pageNumber
                }
                onClick={() => {
                  setPage(
                    pageInfo.pageNumber,
                  );

                  setSelected(null);
                }}
              />
            ),
          )}
        </aside>

        {/* DOCUMENT */}
        <main className="relative min-w-0 flex-1 overflow-auto bg-[#1c1c1f]">
          <div className="flex min-h-full min-w-full items-start justify-center p-6 sm:p-10">
            <div
              className="relative shrink-0 bg-white shadow-2xl"
              style={{
                width:
                  currentPage.width *
                  zoom,

                height:
                  currentPage.height *
                  zoom,
              }}
              onPointerDown={
                pointerDown
              }
              onPointerMove={
                pointerMove
              }
              onPointerUp={
                pointerUp
              }
              onPointerCancel={
                pointerUp
              }
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
              />

              <div className="absolute inset-0">
                {pageObjects.map(
                  (object) => (
                    <div
                      key={
                        object.id
                      }
                      style={objectStyle(
                        object,
                      )}
                      onPointerDown={(
                        event,
                      ) => {
                        if (object.type === "text") {
                          event.stopPropagation();
                          setSelected(object.id);
                          setEditingTextId(object.id);
                          setTool("select");
                          return;
                        }

                        objectDown(
                          event,
                          object,
                        );
                      }}
                    >
                      {object.type ===
                        "text" && (
                        <EditableText
                          key={`${object.id}-${editingTextId === object.id ? "editing" : "view"}`}
                          object={
                            object
                          }
                          zoom={zoom}
                          visible={false}
                          startEditing={
                            editingTextId === object.id
                          }
                          onActivate={() => {
                            if (
                              object.source === "existing"
                            ) {
                              setSelected(object.id);
                            }
                          }}
                          onChange={(
                            text,
                          ) =>
                            update(
                              object.id,
                              {
                                text,
                              },
                            )
                          }
                          onCommit={() => {
                            update(
                              object.id,
                              {},
                              true,
                            );
                            setEditingTextId(null);
                          }}
                        />
                      )}

                      {object.type ===
                        "signature" && (
                        <div
                          className="flex h-full w-full items-center overflow-hidden whitespace-nowrap"
                          style={{
                            fontFamily:
                              "Times New Roman, serif",

                            fontSize:
                              (object.fontSize ||
                                30) *
                              zoom,

                            fontStyle:
                              "italic",

                            color:
                              object.color,
                          }}
                        >
                          {
                            object.text
                          }
                        </div>
                      )}

                      {object.type ===
                        "highlight" && (
                        <div className="h-full w-full rounded-sm bg-yellow-300/40" />
                      )}

                      {object.type ===
                        "draw" && (
                        <svg
                          className="pointer-events-none h-full w-full overflow-visible"
                          viewBox={`0 0 ${Math.max(
                            object.width,
                            1,
                          )} ${Math.max(
                            object.height,
                            1,
                          )}`}
                          preserveAspectRatio="none"
                        >
                          <polyline
                            points={
                              object.points
                                ?.map(
                                  (
                                    point,
                                  ) =>
                                    `${point.x},${point.y}`,
                                )
                                .join(
                                  " ",
                                ) ||
                              ""
                            }
                            fill="none"
                            stroke={
                              object.color ||
                              "#111827"
                            }
                            strokeWidth={
                              2 / zoom
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      {object.type ===
                        "image" &&
                        object.imageDataUrl && (
                          <img
                            src={
                              object.imageDataUrl
                            }
                            alt="PDF element"
                            draggable={
                              false
                            }
                            className="h-full w-full object-contain"
                          />
                        )}

                      {object.id ===
                        selected && (
                        <>
                          <i className="absolute -left-1 -top-1 h-2 w-2 rounded-sm border border-violet-500 bg-white" />

                          <i className="absolute -right-1 -top-1 h-2 w-2 rounded-sm border border-violet-500 bg-white" />

                          <i className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm border border-violet-500 bg-white" />

                          <i className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm border border-violet-500 bg-white" />
                        </>
                      )}
                    </div>
                  ),
                )}

                {drawing.length >
                  1 && (
                  <svg className="pointer-events-none absolute inset-0 h-full w-full">
                    <polyline
                      points={drawing
                        .map(
                          (
                            point,
                          ) =>
                            `${
                              point.x *
                              zoom
                            },${
                              point.y *
                              zoom
                            }`,
                        )
                        .join(
                          " ",
                        )}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* PAGE NAVIGATION */}
          <div className="sticky bottom-4 z-20 mx-auto flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-[#111113]/95 px-2 py-1.5 shadow-2xl backdrop-blur">
            <button
              type="button"
              onClick={() => {
                setPage(
                  (current) =>
                    Math.max(
                      1,
                      current - 1,
                    ),
                );

                setSelected(null);
              }}
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft />
            </button>

            <span className="px-2 text-xs text-slate-300">
              Page{" "}
              <b className="text-white">
                {page}
              </b>{" "}
              /{" "}
              {pages.length}
            </span>

            <button
              type="button"
              onClick={() => {
                setPage(
                  (current) =>
                    Math.min(
                      pages.length,
                      current + 1,
                    ),
                );

                setSelected(null);
              }}
              disabled={
                page >=
                pages.length
              }
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>
        </main>

        {/* PROPERTIES */}
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-l border-white/10 bg-[#111113] xl:block">
          <div className="border-b border-white/10 p-4">
            <h2 className="text-sm font-semibold">
              Properties
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {selectedObject
                ? selectedObject.source ===
                  "existing"
                  ? "Existing PDF text"
                  : "Selected element"
                : "Select an element"}
            </p>

            {selectedObject?.source ===
              "existing" && (
              <p className="mt-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-2.5 py-2 text-[10px] leading-4 text-violet-300">
                Double-click the text on the page
                to edit it. Download PDF to write
                the change into the exported file.
              </p>
            )}
          </div>

          {selectedObject ? (
            <div className="space-y-4 p-4">
              {(selectedObject.type ===
                "text" ||
                selectedObject.type ===
                  "signature") && (
                <>
                  {selectedObject.type ===
                    "text" && (
                    <select
                      value={
                        selectedObject.fontFamily ||
                        "Helvetica"
                      }
                      onChange={(
                        event,
                      ) =>
                        update(
                          selectedObject.id,
                          {
                            fontFamily:
                              event
                                .target
                                .value,
                          },
                          true,
                        )
                      }
                      className="w-full rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                    >
                      <option value="Helvetica">
                        Helvetica
                      </option>

                      <option value="Times-Roman">
                        Times
                      </option>

                      <option value="Courier">
                        Courier
                      </option>
                    </select>
                  )}

                  <input
                    type="number"
                    min={6}
                    max={120}
                    value={
                      selectedObject.fontSize ||
                      16
                    }
                    onChange={(
                      event,
                    ) =>
                      update(
                        selectedObject.id,
                        {
                          fontSize:
                            Number(
                              event
                                .target
                                .value,
                            ),
                        },
                      )
                    }
                    onBlur={() =>
                      update(
                        selectedObject.id,
                        {},
                        true,
                      )
                    }
                    className="w-full rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                  />

                  <input
                    type="color"
                    value={
                      selectedObject.color ||
                      "#111827"
                    }
                    onChange={(
                      event,
                    ) =>
                      update(
                        selectedObject.id,
                        {
                          color:
                            event
                              .target
                              .value,
                        },
                      )
                    }
                    onBlur={() =>
                      update(
                        selectedObject.id,
                        {},
                        true,
                      )
                    }
                    className="h-9 w-full rounded-lg bg-[#09090b]"
                  />

                  {selectedObject.type ===
                    "text" && (
                    <div className="grid grid-cols-4 gap-1">
                      <Toggle
                        icon={
                          <Bold />
                        }
                        active={
                          !!selectedObject.bold
                        }
                        onClick={() => {
                          const value =
                            !selectedObject.bold;

                          update(
                            selectedObject.id,
                            {
                              bold: value,
                            },
                          );

                          update(
                            selectedObject.id,
                            {
                              bold: value,
                            },
                            true,
                          );
                        }}
                      />

                      <Toggle
                        icon={
                          <Italic />
                        }
                        active={
                          !!selectedObject.italic
                        }
                        onClick={() => {
                          const value =
                            !selectedObject.italic;

                          update(
                            selectedObject.id,
                            {
                              italic:
                                value,
                            },
                          );

                          update(
                            selectedObject.id,
                            {
                              italic:
                                value,
                            },
                            true,
                          );
                        }}
                      />

                      <Toggle
                        icon={
                          <Underline />
                        }
                        active={
                          !!selectedObject.underline
                        }
                        onClick={() => {
                          const value =
                            !selectedObject.underline;

                          update(
                            selectedObject.id,
                            {
                              underline:
                                value,
                            },
                          );

                          update(
                            selectedObject.id,
                            {
                              underline:
                                value,
                            },
                            true,
                          );
                        }}
                      />

                      <Toggle
                        icon={
                          <Strikethrough />
                        }
                        active={
                          !!selectedObject.strike
                        }
                        onClick={() => {
                          const value =
                            !selectedObject.strike;

                          update(
                            selectedObject.id,
                            {
                              strike:
                                value,
                            },
                          );

                          update(
                            selectedObject.id,
                            {
                              strike:
                                value,
                            },
                            true,
                          );
                        }}
                      />
                    </div>
                  )}
                </>
              )}

              {/* POSITION */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={Math.round(
                    selectedObject.x,
                  )}
                  onChange={(
                    event,
                  ) =>
                    update(
                      selectedObject.id,
                      {
                        x: Number(
                          event
                            .target
                            .value,
                        ),
                      },
                    )
                  }
                  onBlur={() =>
                    update(
                      selectedObject.id,
                      {},
                      true,
                    )
                  }
                  className="rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                  placeholder="X"
                />

                <input
                  type="number"
                  value={Math.round(
                    selectedObject.y,
                  )}
                  onChange={(
                    event,
                  ) =>
                    update(
                      selectedObject.id,
                      {
                        y: Number(
                          event
                            .target
                            .value,
                        ),
                      },
                    )
                  }
                  onBlur={() =>
                    update(
                      selectedObject.id,
                      {},
                      true,
                    )
                  }
                  className="rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                  placeholder="Y"
                />
              </div>

              {/* SIZE */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={Math.round(
                    selectedObject.width,
                  )}
                  onChange={(
                    event,
                  ) =>
                    update(
                      selectedObject.id,
                      {
                        width:
                          Math.max(
                            10,
                            Number(
                              event
                                .target
                                .value,
                            ),
                          ),
                      },
                    )
                  }
                  onBlur={() =>
                    update(
                      selectedObject.id,
                      {},
                      true,
                    )
                  }
                  className="rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                />

                <input
                  type="number"
                  value={Math.round(
                    selectedObject.height,
                  )}
                  onChange={(
                    event,
                  ) =>
                    update(
                      selectedObject.id,
                      {
                        height:
                          Math.max(
                            10,
                            Number(
                              event
                                .target
                                .value,
                            ),
                          ),
                      },
                    )
                  }
                  onBlur={() =>
                    update(
                      selectedObject.id,
                      {},
                      true,
                    )
                  }
                  className="rounded-lg border border-white/10 bg-[#09090b] px-3 py-2 text-xs"
                />
              </div>

              {/* DELETE */}
              <button
                type="button"
                onClick={() =>
                  remove(
                    selectedObject.id,
                  )
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300"
              >
                <Eraser className="h-4 w-4" />

                Delete element
              </button>
            </div>
          ) : (
            <div className="p-4 text-xs leading-5 text-slate-500">
              Choose a tool, then click
              the document. Select an
              element to edit its
              properties.
            </div>
          )}
        </aside>
      </div>

      {/* HIDDEN FILE INPUTS */}
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(event) => {
          const selectedFile =
            event.target.files?.[0];

          event.target.value = "";

          if (selectedFile) {
            void load(
              selectedFile,
            );
          }
        }}
      />

      <input
        ref={imageRef}
        type="file"
        accept="image/png,image/jpeg,.png,.jpg,.jpeg"
        className="hidden"
        onChange={imagePicked}
      />

      {/* ERROR */}
      {error && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-red-500/20 bg-[#241315] px-4 py-3 text-xs text-red-300 shadow-2xl">
          {error}
        </div>
      )}
    </div>
  );
}

/*
 * -----------------------------------------------------------
 * TOOL BUTTON
 * -----------------------------------------------------------
 */

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
        active
          ? "bg-violet-600 text-white"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      } disabled:opacity-30`}
    >
      <span className="h-4 w-4">
        {children}
      </span>
    </button>
  );
}

/*
 * -----------------------------------------------------------
 * TOGGLE
 * -----------------------------------------------------------
 */

function Toggle({
  icon,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 items-center justify-center rounded-lg ${
        active
          ? "bg-violet-600"
          : "bg-white/5"
      }`}
    >
      {icon}
    </button>
  );
}

/*
 * -----------------------------------------------------------
 * EDITABLE TEXT
 * -----------------------------------------------------------
 */

function EditableText({
  object,
  zoom,
  visible = false,
  startEditing = false,
  onActivate,
  onChange,
  onCommit,
}: {
  object: EditorObject;
  zoom: number;
  visible?: boolean;
  startEditing?: boolean;
  onActivate?: () => void;
  onChange: (text: string) => void;
  onCommit: () => void;
}) {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(startEditing);
  }, [startEditing]);

  const style: CSSProperties = {
    fontFamily: object.fontFamily || "Helvetica",
    fontSize: (object.fontSize || 16) * zoom,
    lineHeight: 1.2,
    fontWeight: object.bold ? 700 : 400,
    fontStyle: object.italic ? "italic" : "normal",
    color: object.color || "#111827",
    textDecoration: [
      object.underline ? "underline" : "",
      object.strike ? "line-through" : "",
    ]
      .filter(Boolean)
      .join(" "),
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    transform: object.rotation
      ? `rotate(${object.rotation}deg)`
      : undefined,
    transformOrigin: "left top",
  };

  if (!editing) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`Edit PDF text: ${object.text}`}
        onPointerDownCapture={(event) => {
          event.stopPropagation();

          onActivate?.();
          setEditing(true);
        }}
        onDoubleClick={(event) => {
          event.stopPropagation();

          onActivate?.();
          setEditing(true);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            event.stopPropagation();

            if (
              object.source === "existing"
            ) {
              onActivate?.();
              setEditing(true);
            }
          }
        }}
        className="h-full w-full"
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "none",
          outline: "none",
          cursor: "text",
          pointerEvents: "auto",
          userSelect: "none",
        }}
        title="Click to edit this PDF text"
      />
    );
  }

  return (
    <textarea
      autoFocus
      value={object.text || ""}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      onPointerDownCapture={(event) => {
        event.stopPropagation();
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();

        if (event.key === "Escape") {
          event.preventDefault();
          setEditing(false);
          onCommit();
          return;
        }

        if (
          event.key === "Enter" &&
          !event.shiftKey
        ) {
          event.preventDefault();
          setEditing(false);
          onCommit();
        }
      }}
      onBlur={() => {
        setEditing(false);
        onCommit();
      }}
      className="h-full w-full resize-none overflow-hidden border-0 p-0 outline-none"
      style={{
        ...style,
        backgroundColor:
          object.source === "existing" ||
          object.textMode === "inline"
            ? "transparent"
            : "rgba(255,255,255,0.96)",
        color:
          object.source === "existing"
            ? "#111827"
            : style.color,
        caretColor: style.color,
        cursor: "text",
        pointerEvents: "auto",
        userSelect: "text",
      }}
    />
  );
}

function Thumbnail({
  bytes,
  pageNumber,
  active,
  onClick,
}: {
  bytes: ArrayBuffer | null;
  pageNumber: number;
  active: boolean;
  onClick: () => void;
}) {
  const [src, setSrc] =
    useState("");

  useEffect(() => {
    let dead = false;

    async function run() {
      if (!bytes) {
        return;
      }

      try {
        const pdfjs =
          await import(
            "pdfjs-dist"
          );

        pdfjs.GlobalWorkerOptions.workerSrc =
          `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const pdf =
          await pdfjs.getDocument({
            data: bytes.slice(0),
          }).promise;

        const pdfPage =
          await pdf.getPage(
            pageNumber,
          );

        const viewport =
          pdfPage.getViewport({
            scale: 0.18,
          });

        const canvas =
          document.createElement(
            "canvas",
          );

        canvas.width =
          Math.floor(
            viewport.width,
          );

        canvas.height =
          Math.floor(
            viewport.height,
          );

        const context =
          canvas.getContext("2d");

        if (!context) {
          return;
        }

        /*
         * IMPORTANT:
         * Current pdfjs-dist requires canvas.
         */
        await pdfPage.render({
          canvas,
          canvasContext: context,
          viewport,
        } as never).promise;

        if (!dead) {
          setSrc(
            canvas.toDataURL(
              "image/jpeg",
              0.75,
            ),
          );
        }
      } catch (thumbnailError) {
        console.error(
          thumbnailError,
        );
      }
    }

    void run();

    return () => {
      dead = true;
    };
  }, [bytes, pageNumber]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border p-1 ${
        active
          ? "border-violet-500 bg-violet-500/10"
          : "border-white/10"
      }`}
    >
      <div className="aspect-[3/4] overflow-hidden rounded bg-white">
        {src ? (
          <img
            src={src}
            alt={`Page ${pageNumber}`}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
            {pageNumber}
          </div>
        )}
      </div>

      <p className="mt-1 text-center text-[10px] text-slate-500">
        {pageNumber}
      </p>
    </button>
  );
}