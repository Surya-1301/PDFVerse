"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

type ToolFAQProps = {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
};

function FAQItemComponent({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border rounded-2xl overflow-hidden transition-colors" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ 
          borderColor: 'var(--border)',
          color: 'var(--text-1)',
          background: 'transparent',
        }}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium pr-8">{item.question}</span>
        <ChevronDown 
          className="shrink-0 h-5 w-5 transition-transform duration-200 text-muted-foreground"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        />
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ 
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-0 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm leading-7" style={{ color: 'var(--text-2)' }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ToolFAQ({ items, title = "Frequently asked questions", subtitle = "" }: ToolFAQProps) {
  if (!items.length) return null;

  return (
    <section className="mx-auto mt-15 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
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
      <div className="mt-10 grid gap-4">
        {items.map((item, index) => (
          <FAQItemComponent key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}