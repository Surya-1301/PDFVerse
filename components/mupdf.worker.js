/* PDFVerse MuPDF Web Worker
 *
 * IMPORTANT:
 * This file must live at:
 *
 *   components/mupdf.worker.js
 *
 * It must be created from PdfVisualEditor with:
 *
 *   new Worker(
 *     new URL("./mupdf.worker.js", import.meta.url),
 *     { type: "module" }
 *   )
 *
 * Do NOT place this worker in /public.
 */

"use strict";

import * as mupdf from "mupdf";

let sourceBytes = null;

/* -------------------------------------------------------
   PDF DOCUMENT
------------------------------------------------------- */

function getPdfDocument() {
  if (!sourceBytes) {
    throw new Error("No PDF is loaded.");
  }

  return mupdf.PDFDocument.openDocument(
    sourceBytes,
    "application/pdf",
  );
}

/* -------------------------------------------------------
   GEOMETRY
------------------------------------------------------- */

function rectFromQuad(quad) {
  if (!Array.isArray(quad) || quad.length < 8) {
    return null;
  }

  const xs = [
    Number(quad[0]),
    Number(quad[2]),
    Number(quad[4]),
    Number(quad[6]),
  ];

  const ys = [
    Number(quad[1]),
    Number(quad[3]),
    Number(quad[5]),
    Number(quad[7]),
  ];

  return [
    Math.min(...xs),
    Math.min(...ys),
    Math.max(...xs),
    Math.max(...ys),
  ];
}

function normalizeQuadSearchResult(result) {
  if (!Array.isArray(result)) {
    return [];
  }

  if (
    result.length >= 8 &&
    typeof result[0] === "number"
  ) {
    return [result];
  }

  return result.filter(
    (item) =>
      Array.isArray(item) &&
      item.length >= 8 &&
      typeof item[0] === "number",
  );
}

/* -------------------------------------------------------
   FIND ORIGINAL PDF TEXT
------------------------------------------------------- */

function nearestSearchQuads(
  page,
  text,
  targetBox,
) {
  if (!text || !text.trim()) {
    return [];
  }

  let matches = [];

  try {
    matches = page.search(text) || [];
  } catch {
    return [];
  }

  if (!matches.length) {
    return [];
  }

  let best = null;
  let bestDistance =
    Number.POSITIVE_INFINITY;

  const targetX = targetBox[0];
  const targetY = targetBox[1];

  for (const raw of matches) {
    const quads =
      normalizeQuadSearchResult(raw);

    if (!quads.length) {
      continue;
    }

    const rects = quads
      .map(rectFromQuad)
      .filter(Boolean);

    if (!rects.length) {
      continue;
    }

    const minX = Math.min(
      ...rects.map(
        (rect) => rect[0],
      ),
    );

    const minY = Math.min(
      ...rects.map(
        (rect) => rect[1],
      ),
    );

    const distance =
      (minX - targetX) ** 2 +
      (minY - targetY) ** 2;

    if (distance < bestDistance) {
      bestDistance = distance;
      best = quads;
    }
  }

  return best || [];
}

/* -------------------------------------------------------
   EXTRACT EDITABLE TEXT
------------------------------------------------------- */

function extractPageText(
  page,
  pageNumber,
) {
  const bounds =
    page.getBounds();

  const pageWidth =
    bounds[2] - bounds[0];

  const pageHeight =
    bounds[3] - bounds[1];

  const structured =
    page.toStructuredText(
      "preserve-whitespace,preserve-spans",
    );

  try {
    const json =
      JSON.parse(
        structured.asJSON(),
      );

    const items = [];

    for (
      const block of
        json.blocks || []
    ) {
      if (
        block.type !==
        "text"
      ) {
        continue;
      }

      for (
        const line of
          block.lines || []
      ) {
        const text =
          String(
            line.text || "",
          );

        if (!text.trim()) {
          continue;
        }

        const bbox =
          line.bbox ||
          block.bbox;

        if (!bbox) {
          continue;
        }

        const x =
          Number(
            bbox.x ??
              bbox[0] ??
              0,
          );

        const y =
          Number(
            bbox.y ??
              bbox[1] ??
              0,
          );

        const w =
          Number(
            bbox.w ??
              (
                (bbox[2] ??
                  0) -
                (bbox[0] ??
                  0)
              ),
          );

        const h =
          Number(
            bbox.h ??
              (
                (bbox[3] ??
                  0) -
                (bbox[1] ??
                  0)
              ),
          );

        const sourceQuads =
          nearestSearchQuads(
            page,
            text,
            [
              x,
              y,
              x + w,
              y + h,
            ],
          );

        let finalX = x;
        let finalY = y;
        let finalW = w;
        let finalH = h;

        if (
          sourceQuads.length
        ) {
          const rects =
            sourceQuads
              .map(
                rectFromQuad,
              )
              .filter(Boolean);

          if (rects.length) {
            finalX =
              Math.min(
                ...rects.map(
                  (rect) =>
                    rect[0],
                ),
              );

            finalY =
              Math.min(
                ...rects.map(
                  (rect) =>
                    rect[1],
                ),
              );

            finalW =
              Math.max(
                ...rects.map(
                  (rect) =>
                    rect[2],
                ),
              ) -
              finalX;

            finalH =
              Math.max(
                ...rects.map(
                  (rect) =>
                    rect[3],
                ),
              ) -
              finalY;
          }
        }

        const font =
          line.font || {};

        const normalizedX =
          finalX /
          pageWidth;

        const normalizedY =
          finalY /
          pageHeight;

        const normalizedWidth =
          Math.min(
            1,
            Math.max(
              0.002,
              finalW /
                pageWidth,
            ),
          );

        const normalizedHeight =
          Math.min(
            1,
            Math.max(
              0.002,
              finalH /
                pageHeight,
            ),
          );

        items.push({
          id:
            `source-${pageNumber}-${items.length}`,

          page:
            pageNumber,

          x:
            normalizedX,

          y:
            normalizedY,

          width:
            normalizedWidth,

          height:
            normalizedHeight,

          text,

          originalText:
            text,

          originalX:
            normalizedX,

          originalY:
            normalizedY,

          originalWidth:
            normalizedWidth,

          originalHeight:
            normalizedHeight,

          sourceQuads,

          fontFamily:
            String(
              font.family ||
                font.name ||
                "sans-serif",
            ),

          fontWeight:
            String(
              font.weight ||
                "normal",
            ),

          fontStyle:
            String(
              font.style ||
                "normal",
            ),

          fontSize:
            Number(
              font.size ||
                finalH ||
                12,
            ),
        });
      }
    }

    return items;
  } finally {
    structured.destroy?.();
  }
}

/* -------------------------------------------------------
   FONT MAPPING
------------------------------------------------------- */

function fontNameFor(
  family,
  weight,
  style,
) {
  const f =
    String(
      family || "",
    ).toLowerCase();

  const bold =
    String(
      weight || "",
    ).toLowerCase() ===
    "bold";

  const italic =
    String(
      style || "",
    ).toLowerCase() ===
    "italic";

  if (
    f.includes("times") ||
    f.includes("serif")
  ) {
    if (
      bold &&
      italic
    ) {
      return "Times-BoldItalic";
    }

    if (italic) {
      return "Times-Italic";
    }

    if (bold) {
      return "Times-Bold";
    }

    return "Times-Roman";
  }

  if (
    f.includes("courier") ||
    f.includes("mono")
  ) {
    if (
      bold &&
      italic
    ) {
      return "Courier-BoldOblique";
    }

    if (italic) {
      return "Courier-Oblique";
    }

    if (bold) {
      return "Courier-Bold";
    }

    return "Courier";
  }

  if (
    bold &&
    italic
  ) {
    return "Helvetica-BoldOblique";
  }

  if (italic) {
    return "Helvetica-Oblique";
  }

  if (bold) {
    return "Helvetica-Bold";
  }

  return "Helvetica";
}

/* -------------------------------------------------------
   INSERT REAL PDF TEXT
------------------------------------------------------- */

function insertTextContent(
  doc,
  page,
  value,
  x,
  topY,
  fontName,
  fontSize,
) {
  const pageObj =
    page.getObject();

  const font =
    new mupdf.Font(
      fontName,
    );

  const fontResource =
    doc.addSimpleFont(
      font,
    );

  let resources =
    pageObj.get(
      "Resources",
    );

  if (
    !resources.isDictionary()
  ) {
    resources =
      doc.newDictionary();

    pageObj.put(
      "Resources",
      resources,
    );
  }

  let fonts =
    resources.get(
      "Font",
    );

  if (
    !fonts.isDictionary()
  ) {
    fonts =
      doc.newDictionary();

    resources.put(
      "Font",
      fonts,
    );
  }

  const resourceName =
    `FV${Math.floor(
      Math.random() *
        100000000,
    )}`;

  fonts.put(
    resourceName,
    fontResource,
  );

  const safeText =
    String(value)
      .replaceAll(
        "\\",
        "\\\\",
      )
      .replaceAll(
        "(",
        "\\(",
      )
      .replaceAll(
        ")",
        "\\)",
      );

  const bounds =
    page.getBounds();

  const y =
    bounds[3] -
    (
      topY +
      fontSize
    );

  const content =
    `q BT /${resourceName} ` +
    `${fontSize} Tf 0 g ` +
    `1 0 0 1 ${x} ${y} Tm ` +
    `(${safeText}) Tj ET Q`;

  const stream =
    doc.addStream(
      content,
      {},
    );

  let contents =
    pageObj.get(
      "Contents",
    );

  if (
    contents.isNull()
  ) {
    pageObj.put(
      "Contents",
      stream,
    );
  } else if (
    contents.isArray()
  ) {
    contents.push(
      stream,
    );
  } else {
    const array =
      doc.newArray();

    array.push(
      contents,
    );

    array.push(
      stream,
    );

    pageObj.put(
      "Contents",
      array,
    );
  }
}

/* -------------------------------------------------------
   REDACTION
------------------------------------------------------- */

function redactQuads(
  page,
  quads,
) {
  for (
    const quad of
      quads || []
  ) {
    const rect =
      rectFromQuad(
        quad,
      );

    if (!rect) {
      continue;
    }

    const annotation =
      page.createAnnotation(
        "Redact",
      );

    annotation.setRect(
      rect,
    );

    annotation.applyRedaction(
      false,
    );

    annotation.destroy?.();
  }
}

function redactItem(
  page,
  item,
  pageWidth,
  pageHeight,
) {
  if (
    item.sourceQuads &&
    item.sourceQuads.length
  ) {
    redactQuads(
      page,
      item.sourceQuads,
    );

    return;
  }

  const rect = [
    item.originalX *
      pageWidth,

    item.originalY *
      pageHeight,

    (
      item.originalX +
      item.originalWidth
    ) *
      pageWidth,

    (
      item.originalY +
      item.originalHeight
    ) *
      pageHeight,
  ];

  const annotation =
    page.createAnnotation(
      "Redact",
    );

  annotation.setRect(
    rect,
  );

  annotation.applyRedaction(
    false,
  );

  annotation.destroy?.();
}

/* -------------------------------------------------------
   FREE TEXT
------------------------------------------------------- */

function addFreeText(
  page,
  text,
  rect,
  fontSize,
) {
  const annotation =
    page.createAnnotation(
      "FreeText",
    );

  annotation.setContents(
    text,
  );

  annotation.setDefaultAppearance(
    "Helv",
    Math.max(
      6,
      fontSize,
    ),
    [0, 0, 0],
  );

  annotation.setRect(
    rect,
  );

  annotation.update();
}

/* -------------------------------------------------------
   HIGHLIGHT
------------------------------------------------------- */

function addHighlight(
  page,
  rect,
) {
  const annotation =
    page.createAnnotation(
      "Highlight",
    );

  annotation.setColor([
    1,
    0.84,
    0.1,
  ]);

  annotation.setQuadPoints([
    [
      rect[0],
      rect[1],

      rect[2],
      rect[1],

      rect[0],
      rect[3],

      rect[2],
      rect[3],
    ],
  ]);

  annotation.update();
}

/* -------------------------------------------------------
   RECTANGLE
------------------------------------------------------- */

function addSquare(
  page,
  rect,
) {
  const annotation =
    page.createAnnotation(
      "Square",
    );

  annotation.setRect(
    rect,
  );

  annotation.setColor([
    0.42,
    0.13,
    0.78,
  ]);

  annotation.setBorderWidth(
    2,
  );

  annotation.update();
}

/* -------------------------------------------------------
   WHITEOUT
------------------------------------------------------- */

function addWhiteout(
  page,
  rect,
) {
  const annotation =
    page.createAnnotation(
      "Redact",
    );

  annotation.setRect(
    rect,
  );

  annotation.applyRedaction(
    false,
  );

  annotation.destroy?.();
}

/* -------------------------------------------------------
   DRAWING
------------------------------------------------------- */

function addInk(
  page,
  item,
  pageWidth,
  pageHeight,
) {
  if (
    !item.points ||
    !item.points.length
  ) {
    return;
  }

  const x =
    item.x *
    pageWidth;

  const y =
    item.y *
    pageHeight;

  const width =
    item.width *
    pageWidth;

  const height =
    item.height *
    pageHeight;

  const annotation =
    page.createAnnotation(
      "Ink",
    );

  annotation.setInkList([
    item.points.map(
      (point) => [
        x +
          point.x *
            width,

        y +
          (
            1 -
            point.y
          ) *
            height,
      ],
    ),
  ]);

  annotation.setColor([
    0.36,
    0.13,
    0.72,
  ]);

  annotation.setBorderWidth(
    2,
  );

  annotation.update();
}

/* -------------------------------------------------------
   IMAGE
------------------------------------------------------- */

function base64ToBytes(
  dataUrl,
) {
  const comma =
    dataUrl.indexOf(
      ",",
    );

  const base64 =
    comma >= 0
      ? dataUrl.slice(
          comma + 1,
        )
      : dataUrl;

  const binary =
    atob(base64);

  const bytes =
    new Uint8Array(
      binary.length,
    );

  for (
    let i = 0;
    i < binary.length;
    i += 1
  ) {
    bytes[i] =
      binary.charCodeAt(
        i,
      );
  }

  return bytes;
}

function addImage(
  doc,
  page,
  item,
  pageWidth,
  pageHeight,
) {
  if (
    !item.imageDataUrl
  ) {
    return;
  }

  const bytes =
    base64ToBytes(
      item.imageDataUrl,
    );

  const image =
    new mupdf.Image(
      bytes,
    );

  const name =
    `FVImage${String(
      item.id || "image",
    ).replace(
      /[^a-zA-Z0-9]/g,
      "",
    )}`;

  const pageObj =
    page.getObject();

  let resources =
    pageObj.get(
      "Resources",
    );

  if (
    !resources.isDictionary()
  ) {
    resources =
      doc.newDictionary();

    pageObj.put(
      "Resources",
      resources,
    );
  }

  let xObjects =
    resources.get(
      "XObject",
    );

  if (
    !xObjects.isDictionary()
  ) {
    xObjects =
      doc.newDictionary();

    resources.put(
      "XObject",
      xObjects,
    );
  }

  const imageObject =
    doc.addImage(
      image,
    );

  xObjects.put(
    name,
    imageObject,
  );

  const width =
    item.width *
    pageWidth;

  const height =
    item.height *
    pageHeight;

  const x =
    item.x *
    pageWidth;

  const y =
    pageHeight -
    (
      item.y *
        pageHeight +
      height
    );

  const content =
    `q ${width} 0 0 ${height} ` +
    `${x} ${y} cm ` +
    `/${name} Do Q`;

  const stream =
    doc.addStream(
      content,
      {},
    );

  let contents =
    pageObj.get(
      "Contents",
    );

  if (
    contents.isNull()
  ) {
    pageObj.put(
      "Contents",
      stream,
    );
  } else if (
    contents.isArray()
  ) {
    contents.push(
      stream,
    );
  } else {
    const array =
      doc.newArray();

    array.push(
      contents,
    );

    array.push(
      stream,
    );

    pageObj.put(
      "Contents",
      array,
    );
  }
}

/* -------------------------------------------------------
   EXPORT
------------------------------------------------------- */

async function exportPdf(
  payload,
) {
  const doc =
    getPdfDocument();

  try {
    const existing =
      payload.existingText ||
      [];

    /*
     * Existing PDF text.
     *
     * If the user changed the text:
     *
     * 1. remove original PDF text
     * 2. write replacement PDF text
     *
     * This prevents the double-text problem.
     */
    for (
      const item of existing
    ) {
      const changed =
        item.text !==
          item.originalText ||
        item.x !==
          item.originalX ||
        item.y !==
          item.originalY ||
        item.width !==
          item.originalWidth ||
        item.height !==
          item.originalHeight;

      if (!changed) {
        continue;
      }

      const page =
        doc.loadPage(
          item.page - 1,
        );

      try {
        const bounds =
          page.getBounds();

        const pageWidth =
          bounds[2] -
          bounds[0];

        const pageHeight =
          bounds[3] -
          bounds[1];

        /*
         * Remove the ORIGINAL text first.
         */
        redactItem(
          page,
          item,
          pageWidth,
          pageHeight,
        );

        /*
         * Insert replacement text.
         */
        if (
          item.text &&
          item.text.trim()
        ) {
          const x =
            item.x *
            pageWidth;

          const topY =
            item.y *
            pageHeight;

          const fontSize =
            Math.max(
              6,
              Math.min(
                96,
                Number(
                  item.fontSize ||
                    12,
                ),
              ),
            );

          const fontName =
            fontNameFor(
              item.fontFamily,
              item.fontWeight,
              item.fontStyle,
            );

          const asciiOnly =
            /^[\x00-\x7F]*$/.test(
              item.text,
            );

          if (
            asciiOnly
          ) {
            insertTextContent(
              doc,
              page,
              item.text,
              x,
              topY,
              fontName,
              fontSize,
            );
          } else {
            addFreeText(
              page,
              item.text,
              [
                x,
                topY,

                x +
                  item.width *
                    pageWidth,

                topY +
                  item.height *
                    pageHeight,
              ],
              fontSize,
            );
          }
        }
      } finally {
        page.destroy?.();
      }
    }

    /* -------------------------------------------------
       DELETED EXISTING TEXT
    ------------------------------------------------- */

    for (
      const item of
        payload.deletedExistingItems ||
        []
    ) {
      const page =
        doc.loadPage(
          item.page - 1,
        );

      try {
        const bounds =
          page.getBounds();

        redactItem(
          page,
          item,
          bounds[2] -
            bounds[0],
          bounds[3] -
            bounds[1],
        );
      } finally {
        page.destroy?.();
      }
    }

    /* -------------------------------------------------
       NEW OBJECTS
    ------------------------------------------------- */

    for (
      const item of
        payload.newItems ||
        []
    ) {
      const page =
        doc.loadPage(
          item.page - 1,
        );

      try {
        const bounds =
          page.getBounds();

        const pageWidth =
          bounds[2] -
          bounds[0];

        const pageHeight =
          bounds[3] -
          bounds[1];

        const rect = [
          item.x *
            pageWidth,

          item.y *
            pageHeight,

          (
            item.x +
            item.width
          ) *
            pageWidth,

          (
            item.y +
            item.height
          ) *
            pageHeight,
        ];

        if (
          item.type ===
          "text"
        ) {
          addFreeText(
            page,
            item.text ||
              "",
            rect,
            Math.max(
              8,
              item.height *
                pageHeight *
                0.8,
            ),
          );
        }

        if (
          item.type ===
          "highlight"
        ) {
          addHighlight(
            page,
            rect,
          );
        }

        if (
          item.type ===
          "rectangle"
        ) {
          addSquare(
            page,
            rect,
          );
        }

        if (
          item.type ===
          "whiteout"
        ) {
          addWhiteout(
            page,
            rect,
          );
        }

        if (
          item.type ===
          "draw"
        ) {
          addInk(
            page,
            item,
            pageWidth,
            pageHeight,
          );
        }

        if (
          item.type ===
          "image"
        ) {
          addImage(
            doc,
            page,
            item,
            pageWidth,
            pageHeight,
          );
        }
      } finally {
        page.destroy?.();
      }
    }

    /*
     * Save incrementally so the original PDF structure and
     * resources are preserved as much as possible.
     */
    const output =
      doc
        .saveToBuffer(
          "incremental",
        )
        .asUint8Array();

    const transferable =
      output.buffer.slice(
        output.byteOffset,
        output.byteOffset +
          output.byteLength,
      );

    self.postMessage(
      {
        type: "export",
        id:
          payload.requestId,
        buffer:
          transferable,
      },
      [
        transferable,
      ],
    );
  } finally {
    doc.destroy?.();
  }
}

/* -------------------------------------------------------
   WORKER MESSAGE HANDLER
------------------------------------------------------- */

self.onmessage =
  async (event) => {
    const {
      type,
      id,
      payload,
    } = event.data;

    try {
      switch (type) {
        /* ---------------------------------------------
           OPEN PDF
        --------------------------------------------- */

        case "open": {
          const incoming =
            payload instanceof
            ArrayBuffer
              ? new Uint8Array(
                  payload,
                )
              : new Uint8Array(
                  payload.buffer,
                  payload.byteOffset,
                  payload.byteLength,
                );

          sourceBytes =
            new Uint8Array(
              incoming,
            );

          const doc =
            getPdfDocument();

          try {
            const pageCount =
              doc.countPages();

            const text = [];

            for (
              let i = 0;
              i < pageCount;
              i += 1
            ) {
              const page =
                doc.loadPage(
                  i,
                );

              try {
                text.push(
                  ...extractPageText(
                    page,
                    i + 1,
                  ),
                );
              } finally {
                page.destroy?.();
              }
            }

            self.postMessage({
              type: "open",
              id,
              pageCount,
              text,
            });
          } finally {
            doc.destroy?.();
          }

          break;
        }

        /* ---------------------------------------------
           RENDER PAGE
        --------------------------------------------- */

        case "render": {
          const doc =
            getPdfDocument();

          try {
            const page =
              doc.loadPage(
                Number(
                  payload.page,
                ),
              );

            try {
              const bounds =
                page.getBounds();

              const scale =
                Number(
                  payload.scale ||
                    1,
                );

              const matrix =
                mupdf.Matrix.scale(
                  scale,
                  scale,
                );

              const pixmap =
                page.toPixmap(
                  matrix,
                  mupdf.ColorSpace
                    .DeviceRGB,
                  false,
                  true,
                );

              try {
                const png =
                  new Uint8Array(
                    pixmap.asPNG(),
                  );

                const buffer =
                  png.buffer.slice(
                    png.byteOffset,
                    png.byteOffset +
                      png.byteLength,
                  );

                self.postMessage(
                  {
                    type:
                      "render",

                    id,

                    width:
                      pixmap.getWidth(),

                    height:
                      pixmap.getHeight(),

                    pageWidth:
                      bounds[2] -
                      bounds[0],

                    pageHeight:
                      bounds[3] -
                      bounds[1],

                    png:
                      buffer,
                  },
                  [
                    buffer,
                  ],
                );
              } finally {
                pixmap.destroy?.();
              }
            } finally {
              page.destroy?.();
            }
          } finally {
            doc.destroy?.();
          }

          break;
        }

        /* ---------------------------------------------
           EXPORT EDITED PDF
        --------------------------------------------- */

        case "export": {
          await exportPdf({
            ...payload,
            requestId:
              id,
          });

          break;
        }

        default:
          throw new Error(
            `Unknown MuPDF operation: ${type}`,
          );
      }
    } catch (error) {
      console.error(
        "PDFVerse MuPDF worker error:",
        error,
      );

      self.postMessage({
        type:
          "error",

        id,

        error:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  };