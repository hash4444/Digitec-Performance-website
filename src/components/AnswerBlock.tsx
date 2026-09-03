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
  <section className={`home-section ${className}`} aria-label={question}>
    <div className="home-container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
      <div>
        <p className="home-kicker mb-4">Quick answer</p>
        <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-off-white sm:text-4xl">{question}</h2>
      </div>
      <div>
        <p className="text-base leading-8 text-white/58 sm:text-lg">{answer}</p>
        {facts && facts.length > 0 && (
          <ul className="mt-10 grid border-t border-white/[0.09] sm:grid-cols-2">
            {facts.map((fact) => (
              <li key={fact} className="flex gap-3 border-b border-white/[0.09] py-4 pr-6 text-sm leading-6 text-white/45 sm:odd:border-r sm:even:pl-6">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-burnt-orange" />
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
