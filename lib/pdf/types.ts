export type ToolId =
  | "select"
  | "edittext"
  | "text"
  | "image"
  | "sign"
  | "highlight"
  | "whiteout"
  | "eraser"
  | "draw"
  | "shape"
  | "link";


export type ShapeKind = "rect" | "ellipse" | "line";

export interface BaseItem {
  id: string;
  page: number; // index into the *original* page list
  x: number; // display-space points, top-left origin
  y: number;
  w: number;
  h: number;
}

export interface TextItem extends BaseItem {
  type: "text";
  text: string;
  size: number;
  color: string;
  font: "Helvetica" | "Times" | "Courier";
  bold: boolean;
  italic: boolean;
  underline?: boolean;
  strike?: boolean;
  align: "left" | "center" | "right";
  /** "existing" = a run of text extracted from the source PDF. */
  source?: "existing" | "new";
  /** Original string for an "existing" run; used to detect real edits. */
  original?: string;
  /** Baseline in display space, for pixel-accurate re-drawing. */
  baseline?: number;
  /** Geometry of the original run, kept even if the item is moved/resized. */
  ox?: number;
  oy?: number;
  ow?: number;
  oh?: number;

}


export interface ImageItem extends BaseItem {
  type: "image";
  src: string; // data URL
  signature?: boolean;
}

export interface RectItem extends BaseItem {
  type: "highlight" | "whiteout";
  color: string;
}

export interface ShapeItem extends BaseItem {
  type: "shape";
  kind: ShapeKind;
  stroke: string;
  fill: string | null;
  strokeWidth: number;
}

export interface DrawItem extends BaseItem {
  type: "draw";
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
}

export interface LinkItem extends BaseItem {
  type: "link";
  url: string;
}

export type Item =
  | TextItem
  | ImageItem
  | RectItem
  | ShapeItem
  | DrawItem
  | LinkItem;

export interface PageState {
  index: number; // original index in source document
  rotation: number; // 0 | 90 | 180 | 270 additional rotation
  blank?: { width: number; height: number };
}

export interface DocState {
  pages: PageState[];
  items: Item[];
}

export const LINE_HEIGHT = 1.25;

export function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return {
    r: parseInt(v.slice(0, 2), 16) / 255,
    g: parseInt(v.slice(2, 4), 16) / 255,
    b: parseInt(v.slice(4, 6), 16) / 255,
  };
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
