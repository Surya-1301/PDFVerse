import { Clock3, LockKeyhole } from "lucide-react";

export function ComingSoonOverlay({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-[3px]"
      role="dialog"
      aria-modal="true"
      aria-label="Coming soon"
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div
        className={
          compact
            ? "w-full max-w-[280px] rounded-2xl border border-white/10 bg-slate-950/95 p-4 text-center shadow-2xl shadow-violet-950/40"
            : "w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/65 p-6 text-center shadow-2xl shadow-violet-950/40 sm:p-8"
        }
      >
        <div
          className={
            compact
              ? "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300 ring-1 ring-violet-400/20"
              : "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-300 ring-1 ring-violet-400/20 sm:h-20 sm:w-20"
          }
        >
          <LockKeyhole
            className={compact ? "h-6 w-6" : "h-8 w-8"}
          />
        </div>

        <h3
          className={
            compact
              ? "mt-3 text-lg font-black text-white"
              : "mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl"
          }
        >
          Coming Soon
        </h3>

        <p
          className={
            compact
              ? "mt-2 text-xs leading-5 text-slate-400"
              : "mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300 sm:text-base"
          }
        >
          The PDF Editor is under development and will be available soon.
        </p>

        {!compact ? (
          <div className="mx-auto mt-5 flex max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left">
            <Clock3 className="h-6 w-6 shrink-0 text-violet-400" />
            <p className="text-sm leading-5 text-slate-300">
              Stay tuned! We&apos;re working on something amazing for you.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
