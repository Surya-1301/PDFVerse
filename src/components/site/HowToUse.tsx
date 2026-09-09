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
  /** Extra classes merged onto the root <section> (e.g. to override the default top margin). */
  className?: string;
};

/* Theme-aware card styles used by both desktop and mobile */
const cardBaseStyles: React.CSSProperties = {
  borderColor: 'var(--border)',
  boxShadow: '0 4px 12px -2px var(--accent-glow)',
};

const iconBoxStyles: React.CSSProperties = {
  borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
  background: 'var(--accent-light)',
  color: 'var(--accent)',
};

const iconBoxHoverStyles: React.CSSProperties = {
  borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)',
  color: 'var(--accent)',
};

const progressBgStyles: React.CSSProperties = {
  background: 'color-mix(in srgb, var(--text-1) 12%, transparent)',
};

const progressFillStyles: React.CSSProperties = {
  background: 'var(--accent-gradient)',
};

function StepCard({ step, index }: { step: HowToUseStep; index: number }) {
  return (
    <div
      className="how-to-use-card group relative rounded-2xl border bg-slate-950 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        borderColor: 'var(--border)',
        boxShadow: '0 4px 12px -2px var(--accent-glow)',
      }}
    >
      <div className="absolute right-4 top-4 text-xs font-bold" style={{ color: 'var(--text-3)' }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-300 group-hover:scale-105"
        style={iconBoxStyles}
      >
        {step.icon}
      </div>

      <h3 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>{step.title}</h3>

      <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-2)' }}>{step.description}</p>

      <div className="mt-5 h-1 w-10 overflow-hidden rounded-full" style={progressBgStyles}>
        <div className="h-full w-full origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100" style={progressFillStyles} />
      </div>
    </div>
  );
}

export function HowToUse({
  title = "How to use",
  subtitle = "",
  steps,
  desktopSteps,
  className = "",
}: HowToUseProps) {
  const lgSteps = desktopSteps ?? steps;
  const sectionClass = [
    "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
    className ? className : "mt-15",
  ].join(" ");
  return (
    <section className={sectionClass}>
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center">
       

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text-1)' }}>
          {title}
        </h2>

        {subtitle ? (
          <p className="mx-auto mt-3 text-sm leading-6 sm:text-base" style={{ color: 'var(--text-2)' }}>
            {subtitle}
          </p>
        ) : null}
      </div>

      {/* Steps */}
      <div className="relative mt-10">
        {/* Connecting line - desktop */}
        <div
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px lg:block"
          style={{
            background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 30%, transparent), transparent)',
          }}
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
              className="group flex w-full items-center gap-4 rounded-2xl border bg-slate-950 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                borderColor: 'var(--border)',
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