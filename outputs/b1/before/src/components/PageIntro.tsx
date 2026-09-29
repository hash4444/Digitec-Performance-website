import type { ReactNode } from 'react';

type PageIntroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export const PageIntro = ({
  eyebrow,
  title,
  description,
  children,
  className = '',
}: PageIntroProps) => (
  <section
    className={`relative overflow-hidden border-b border-white/[0.08] bg-[#101113] py-20 sm:py-24 lg:py-28 ${className}`}
  >
    <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
      <div className="max-w-4xl">
        <div className="home-kicker mb-5">{eyebrow}</div>
        <h1 className="max-w-3xl text-[clamp(2.75rem,5.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white">
          {title}
        </h1>
        {description && (
          <div className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
            {description}
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);
