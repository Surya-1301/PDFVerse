import type { ReactNode } from "react";

type HowToUseStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

type HowToUseProps = {
  title?: string;
  subtitle?: string;
  steps: HowToUseStep[];
  /** Optional expanded step list shown only on desktop (lg and up). */
  desktopSteps?: HowToUseStep[];
};

function StepCard({ step, index }: { step: HowToUseStep; index: number }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-violet-950/20">
      <div className="absolute right-4 top-4 text-xs font-bold text-slate-600">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-violet-500/15 text-cyan-300 shadow-lg shadow-cyan-950/20 transition duration-300 group-hover:scale-105 group-hover:border-violet-400/30 group-hover:text-violet-300">
        {step.icon}
      </div>

      <h3 className="text-base font-semibold text-white">{step.title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">{step.description}</p>

      <div className="mt-5 h-1 w-10 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-transform duration-300 group-hover:scale-x-100" />
      </div>
    </div>
  );
}

export function HowToUse({
  title = "How to use",
  subtitle = "Follow these simple steps to use this tool.",
  steps,
  desktopSteps,
}: HowToUseProps) {
  const lgSteps = desktopSteps ?? steps;
  return (
    <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
       

        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mx-auto mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* Steps */}
      <div className="relative mt-10">
        {/* Connecting line - desktop */}
        <div
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent lg:block"
        />

        {/* Tablet: original card layout */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:hidden">
          {steps.map((step, index) => (
            <StepCard key={`${step.title}-tablet-${index}`} step={step} index={index} />
          ))}
        </div>

        {/* Desktop: expanded card layout */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-3">
          {lgSteps.map((step, index) => (
            <StepCard key={`${step.title}-desktop-${index}`} step={step} index={index} />
          ))}
        </div>


        {/* Mobile only: icon on the left, title + description on the right — theme-aware like desktop */}
        <div className="grid gap-3 sm:hidden">
          {steps.map((step, index) => (
            <div
              key={`${step.title}-mobile-${index}`}
              className="group flex w-full items-center gap-4 rounded-2xl border p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: 'var(--border)',
                background: 'var(--surface)',
                boxShadow: '0 4px 12px -2px var(--accent-glow)',
              }}
            >
              {/* Accent-tinted icon (matches desktop StepCard) */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition duration-300 group-hover:scale-105 group-hover:border-violet-400/30"
                style={{
                  borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                }}
              >
                {step.icon}
              </div>

              {/* Right-side content */}
              <div className="min-w-0 flex-1 pr-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[14px] font-semibold leading-5" style={{ color: 'var(--text-1)' }}>
                    {step.title}
                  </h3>

                  <span className="shrink-0 text-[11px] font-bold" style={{ color: 'var(--text-3)' }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-1 text-[12px] leading-5" style={{ color: 'var(--text-2)' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}