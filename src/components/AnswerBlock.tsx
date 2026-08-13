import React from 'react';

interface AnswerBlockProps {
  /** Question phrased the way a person would ask an assistant. */
  question: string;
  /** Short, self-contained answer that reads correctly when quoted alone. */
  answer: string;
  /** Optional supporting facts, kept short so they stay quotable. */
  facts?: string[];
  className?: string;
}

/**
 * Answer-first block for AI assistants, AI Overviews and skim readers.
 * Keeps a single quotable paragraph immediately after the question so the
 * page states its answer without requiring the whole section to be read.
 */
export const AnswerBlock = ({ question, answer, facts, className = '' }: AnswerBlockProps) => (
  <section className={`py-10 sm:py-14 ${className}`} aria-label={question}>
    <div className="max-w-4xl mx-auto px-5 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p className="eyebrow mb-3">Quick answer</p>
        <h2 className="text-xl sm:text-2xl font-bold text-off-white mb-3 leading-snug">{question}</h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">{answer}</p>
        {facts && facts.length > 0 && (
          <ul className="mt-5 space-y-2">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-3 text-sm sm:text-base text-white/60">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-burnt-orange" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </section>
);

export default AnswerBlock;
