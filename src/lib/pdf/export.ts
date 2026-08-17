import {
  PDFDocument,
  StandardFonts,
  degrees,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { hexToRgb, LINE_HEIGHT, type DocState, type Item } from "./types";
import { isExistingTextEdited } from "./textlayer";


/** Map a point in display space (top-left origin, page rotated by `rot`)
 *  to PDF user space (bottom-left origin, unrotated page). */
function mapPoint(
  dx: number,
  dy: number,
  rot: number,
  w: number,
  h: number,
): [number, number] {
  let ux: number, uy: number;
  switch (((rot % 360) + 360) % 360) {
    case 90:
      ux = dy;
      uy = h - dx;
      break;
    case 180:
      ux = w - dx;
      uy = h - dy;
      break;
    case 270:
      ux = w - dy;
      uy = dx;
      break;
    default:
      ux = dx;
      uy = dy;
  }
  return [ux, h - uy];
}

async function embedImage(pdf: PDFDocument, src: string) {
  const bytes = await fetch(src).then((r) => r.arrayBuffer());
  if (src.startsWith("data:image/jpeg") || src.startsWith("data:image/jpg"))
    return pdf.embedJpg(bytes);
  return pdf.embedPng(bytes);
}

export async function buildPdf(
  source: ArrayBuffer,
  state: DocState,
): Promise<Uint8Array> {
  const src = await PDFDocument.load(source, { ignoreEncryption: true });
  const out = await PDFDocument.create();

  const realPages = state.pages.filter((p) => !p.blank);
  const copied = await out.copyPages(
    src,
    realPages.map((p) => p.index),
  );
  const copyByIndex = new Map<number, PDFPage>();
  realPages.forEach((p, i) => {
    const c = copied[i];
    if (c) copyByIndex.set(p.index, c);
  });

  const fonts = {
    Helvetica: await out.embedFont(StandardFonts.Helvetica),
    HelveticaB: await out.embedFont(StandardFonts.HelveticaBold),
    HelveticaI: await out.embedFont(StandardFonts.HelveticaOblique),
    HelveticaBI: await out.embedFont(StandardFonts.HelveticaBoldOblique),
    Times: await out.embedFont(StandardFonts.TimesRoman),
    TimesB: await out.embedFont(StandardFonts.TimesRomanBold),
    TimesI: await out.embedFont(StandardFonts.TimesRomanItalic),
    TimesBI: await out.embedFont(StandardFonts.TimesRomanBoldItalic),
    Courier: await out.embedFont(StandardFonts.Courier),
    CourierB: await out.embedFont(StandardFonts.CourierBold),
    CourierI: await out.embedFont(StandardFonts.CourierOblique),
    CourierBI: await out.embedFont(StandardFonts.CourierBoldOblique),
  };

  const imageCache = new Map<string, Awaited<ReturnType<typeof embedImage>>>();

  for (const pageState of state.pages) {
    let page: PDFPage;
    let baseRotation = 0;
    if (pageState.blank) {
      page = out.addPage([pageState.blank.width, pageState.blank.height]);
    } else {
      const p = copyByIndex.get(pageState.index)!;
      baseRotation = p.getRotation().angle;
      page = out.addPage(p);
    }

    const { width: w, height: h } = page.getSize();
    const rot = (((baseRotation + pageState.rotation) % 360) + 360) % 360;
    page.setRotation(degrees(rot));

    const items: Item[] = state.items.filter((i) => i.page === pageState.index);
    for (const item of items) {
      // pivot = display bottom-left of the item box
      const [px, py] = mapPoint(item.x, item.y + item.h, rot, w, h);
      const rotate = degrees(rot);

      if (item.type === "text") {
        // an untouched run of original PDF text: leave the page vectors alone
        if (item.source === "existing" && !isExistingTextEdited(item)) continue;

        // an edited run of original text: cover the original glyphs first
        if (item.source === "existing") {
          const ox = item.ox ?? item.x;
          const oy = item.oy ?? item.y;
          const ow = item.ow ?? item.w;
          const padX = Math.max(2, item.size * 0.18);
          const top = oy - item.size * 0.3;
          const coverWidth = ow + padX * 2;
          const coverHeight = Math.max(item.oh ?? item.h, item.size * 1.55) + 4;
          const [cx, cy] = mapPoint(ox - padX, top + coverHeight, rot, w, h);
          page.drawRectangle({
            x: cx,
            y: cy,
            width: coverWidth,
            height: coverHeight,
            color: rgb(1, 1, 1),
            rotate,
          });
        }


        const key =
          item.font +
          (item.bold && item.italic ? "BI" : item.bold ? "B" : item.italic ? "I" : "");
        const font: PDFFont =
          (fonts as Record<string, PDFFont>)[key] ?? fonts.Helvetica;
        const c = hexToRgb(item.color);
        const lh = item.size * LINE_HEIGHT;
        const lines = item.text.split("\n");
        lines.forEach((line, i) => {
          const tw = font.widthOfTextAtSize(line, item.size);
          let offX = 0;
          if (item.align === "center") offX = (item.w - tw) / 2;
          else if (item.align === "right") offX = item.w - tw;
          const baselineY = item.y + i * lh + item.size;
          const [tx, ty] = mapPoint(item.x + offX, baselineY, rot, w, h);
          page.drawText(line, {
            x: tx,
            y: ty,
            size: item.size,
            font,
            color: rgb(c.r, c.g, c.b),
            rotate,
          });
          const rule = (dy: number) => {
            const [ax, ay] = mapPoint(item.x + offX, baselineY + dy, rot, w, h);
            const [bx, by] = mapPoint(item.x + offX + tw, baselineY + dy, rot, w, h);
            page.drawLine({
              start: { x: ax, y: ay },
              end: { x: bx, y: by },
              thickness: Math.max(0.5, item.size * 0.06),
              color: rgb(c.r, c.g, c.b),
            });
          };
          if (item.underline) rule(item.size * 0.12);
          if (item.strike) rule(-item.size * 0.3);
        });

      } else if (item.type === "image") {
        let img = imageCache.get(item.src);
        if (!img) {
          img = await embedImage(out, item.src);
          imageCache.set(item.src, img);
        }
        page.drawImage(img, {
          x: px,
          y: py,
          width: item.w,
          height: item.h,
          rotate,
        });
      } else if (item.type === "highlight" || item.type === "whiteout") {
        const c = hexToRgb(item.color);
        page.drawRectangle({
          x: px,
          y: py,
          width: item.w,
          height: item.h,
          color: rgb(c.r, c.g, c.b),
          opacity: item.type === "highlight" ? 0.38 : 1,
          rotate,
        });
      } else if (item.type === "shape") {
        const s = hexToRgb(item.stroke);
        const f = item.fill ? hexToRgb(item.fill) : null;
        if (item.kind === "rect") {
          page.drawRectangle({
            x: px,
            y: py,
            width: item.w,
            height: item.h,
            borderColor: rgb(s.r, s.g, s.b),
            borderWidth: item.strokeWidth,
            ...(f ? { color: rgb(f.r, f.g, f.b) } : {}),
            rotate,
          });
        } else if (item.kind === "ellipse") {
          const [cx, cy] = mapPoint(
            item.x + item.w / 2,
            item.y + item.h / 2,
            rot,
            w,
            h,
          );
          const swap = rot === 90 || rot === 270;
          page.drawEllipse({
            x: cx,
            y: cy,
            xScale: (swap ? item.h : item.w) / 2,
            yScale: (swap ? item.w : item.h) / 2,
            borderColor: rgb(s.r, s.g, s.b),
            borderWidth: item.strokeWidth,
            ...(f ? { color: rgb(f.r, f.g, f.b) } : {}),
          });
        } else {
          const [ax, ay] = mapPoint(item.x, item.y, rot, w, h);
          const [bx, by] = mapPoint(item.x + item.w, item.y + item.h, rot, w, h);
          page.drawLine({
            start: { x: ax, y: ay },
            end: { x: bx, y: by },
            thickness: item.strokeWidth,
            color: rgb(s.r, s.g, s.b),
          });
        }
      } else if (item.type === "draw") {
        const c = hexToRgb(item.color);
        for (let i = 1; i < item.points.length; i++) {
          const a = item.points[i - 1]!;
          const b = item.points[i]!;
          const [ax, ay] = mapPoint(item.x + a.x, item.y + a.y, rot, w, h);
          const [bx, by] = mapPoint(item.x + b.x, item.y + b.y, rot, w, h);
          page.drawLine({
            start: { x: ax, y: ay },
            end: { x: bx, y: by },
            thickness: item.strokeWidth,
            color: rgb(c.r, c.g, c.b),
            lineCap: 1,
          });
        }
      } else if (item.type === "link") {
        const [lx, ly] = mapPoint(item.x, item.y + item.h, rot, w, h);
        const annot = out.context.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: [lx, ly, lx + item.w, ly + item.h],
          Border: [0, 0, 0],
          A: out.context.obj({
            Type: "Action",
            S: "URI",
            URI: out.context.obj(item.url),
          }),
        });
        const existing = page.node.Annots();
        if (existing) existing.push(annot);
        else page.node.set(out.context.obj("Annots"), out.context.obj([annot]));
      }
    }
  }

  return out.save();
}
