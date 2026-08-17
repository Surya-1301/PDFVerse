"use client";
import { useEffect, useRef, useState } from "react";

export function SignaturePad({
  onClose,
  onDone,
}: {
  onClose: () => void;
  onDone: (dataUrl: string, ratio: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const [empty, setEmpty] = useState(true);
  const [color, setColor] = useState("#101828");

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = 640 * 2;
    c.height = 220 * 2;
    const ctx = c.getContext("2d")!;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const pos = (e: React.PointerEvent) => {
    const r = (e.target as HTMLCanvasElement).getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-card p-5 shadow-pop">
        <h2 className="text-base font-semibold">Draw your signature</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Sign with your mouse, trackpad or finger.
        </p>
        <div className="mt-3 flex items-center gap-2">
          {["#101828", "#1d4ed8", "#b91c1c"].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ background: c }}
              className={`h-6 w-6 rounded-full ring-offset-2 ${color === c ? "ring-2 ring-ring" : ""}`}
              aria-label={`Ink color ${c}`}
            />
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className="mt-3 h-[220px] w-full touch-none rounded-lg border border-dashed bg-muted"
          onPointerDown={(e) => {
            drawing.current = true;
            (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
            const ctx = canvasRef.current!.getContext("2d")!;
            const p = pos(e);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            setEmpty(false);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = canvasRef.current!.getContext("2d")!;
            const p = pos(e);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }}
          onPointerUp={() => (drawing.current = false)}
        />
        <div className="mt-4 flex justify-between">
          <button
            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
            onClick={() => {
              const c = canvasRef.current!;
              c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
              setEmpty(true);
            }}
          >
            Clear
          </button>
          <div className="flex gap-2">
            <button
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={empty}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
              onClick={() => {
                const c = canvasRef.current!;
                onDone(c.toDataURL("image/png"), c.height / c.width);
              }}
            >
              Place signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
