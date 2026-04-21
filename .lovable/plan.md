

## Mobile Layout Refinement: Tighter, Minimal, Premium

Goal: condense the homepage and key sections on mobile so the page scrolls fast, feels modern (Porsche/Apple style), and shows more content per screen, without removing copy.

### Global mobile spacing rules

Apply consistently to every section component listed below.

- Section vertical padding: `py-16 sm:py-24` → **`py-10 sm:py-20`**
- Section header bottom margin: `mb-12 sm:mb-16` → **`mb-8 sm:mb-14`**
- Heading sizes (H2): `text-3xl sm:text-4xl ... lg:text-6xl` → **`text-2xl sm:text-3xl md:text-4xl lg:text-5xl`**
- Heading bottom margin: `mb-6 sm:mb-8` → **`mb-3 sm:mb-5`**
- Body paragraph: `text-lg sm:text-xl` → **`text-sm sm:text-base lg:text-lg`** with tighter `leading-snug` on mobile, `leading-relaxed` from `sm:`
- Buttons (mobile): full-width retained, but reduce `py-4 sm:py-6` → **`py-3 sm:py-5`**, `text-base sm:text-lg` → **`text-sm sm:text-base`**, `px-8` → **`px-6`**
- Card radius unchanged (keep brand 24px+ rounded look)

### Section-by-section changes

**1. `src/components/Hero.tsx`**
- Replace `min-h-screen` with `min-h-[88vh] sm:min-h-screen` so hero doesn't dominate mobile
- H1: `text-3xl` → `text-[2rem]` (32px) with `mb-3 sm:mb-6`
- H2 subline: `text-xl` → `text-base sm:text-2xl`, `mb-3 sm:mb-5`
- Lead paragraph: `text-base` → `text-sm sm:text-lg`, `mb-6 sm:mb-10`
- CTA gap: `gap-4` → `gap-3`, button `py-3.5`
- Scroll arrow margin: `mt-12` → `mt-6 sm:mt-12`

**2. `src/components/WhatWeDo.tsx`**
- Section: `py-16` → `py-10 sm:py-20`
- Header block margin: `mb-12` → `mb-8 sm:mb-14`
- Convert grid to **2 columns on mobile** with the third card spanning full width: `grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10`
- Card image height: `h-48` → `h-32 sm:h-56`
- Card title: `text-xl sm:text-2xl mb-4` → `text-base sm:text-2xl mb-2 sm:mb-4`
- Card paragraph: `text-base sm:text-lg` → `text-xs sm:text-base`, `leading-snug sm:leading-relaxed`

**3. `src/components/BrandsWeServe.tsx`**
- Mobile section padding: `py-16` → `py-10`
- Header: `mb-10` → `mb-6`, H2 to `text-2xl sm:text-4xl`, paragraph to `text-sm sm:text-xl`
- `MobileGrid`: `grid-cols-3 gap-6` → `grid-cols-4 gap-3`, logo circle `w-20 h-20` → `w-16 h-16`, label `text-xs` → `text-[11px]`
- Bottom CTA: tighten `mt-10` → `mt-6`, button `py-3 text-sm` on mobile

**4. `src/components/ServiceGrid.tsx`** (homepage services, currently horizontal scroll only)
- Convert mobile from horizontal scroll to a **2-column grid**, keep horizontal scroll only for `sm+`
  - Wrapper: on mobile use `grid grid-cols-2 gap-3 px-1`; on `sm:` keep existing `horizontal-scroll-container` with flex
- Mobile card size: replace `w-[72vw]` → no fixed width inside grid; `min-h-[380px]` → `min-h-0` on mobile
- Mobile card padding: `p-5` → `p-3`
- Mobile card image: keep `aspect-[4/3]` with `mb-3`
- Mobile title: `text-xl` → `text-sm font-bold`, `mb-1`
- Mobile description: clamp to 2 lines, `text-xs leading-snug mb-3`
- Mobile CTA: smaller `py-2 text-xs`, or replace with a chevron link to save vertical space
- Section header: H2 `text-3xl` → `text-2xl`, hide the "← Scroll to Explore →" hint on mobile (only show `sm:block`)
- Category icon block: `w-12 h-12` → `w-9 h-9` mobile, gap `gap-2`
- Bottom "View All Services" button: `py-4 text-base` → `py-3 text-sm` mobile

**5. `src/pages/Services.tsx`** (already 2-column on mobile)
- Tighten further: hero `py-20` → `py-12 sm:py-24`
- Hero H1: `text-4xl` → `text-2xl sm:text-5xl`, `mb-4` → `mb-2 sm:mb-4`
- Hero paragraph: `text-lg` → `text-xs sm:text-lg`, `leading-snug sm:leading-relaxed`
- Category H2: `text-2xl mb-8` → `text-lg sm:text-3xl mb-4 sm:mb-8`, border-l size scaled
- Card grid gap: `gap-3` → `gap-2.5`
- Card padding: `p-3` → `p-2.5`, title `text-sm` → `text-[13px] leading-tight`, description `text-xs` clamp 2 lines, `mt-1` only
- Section spacing: `space-y-16` → `space-y-8 sm:space-y-16`, bottom `pb-20` → `pb-12 sm:pb-24`

**6. `src/components/WhyChooseUs.tsx`**
- Section: `py-16` → `py-10 sm:py-20`
- Stats card padding: `p-4` → `p-3`, number `text-2xl` → `text-xl`, title `text-sm` → `text-xs`, description `text-xs` clamp 2 lines
- Grid gap: `gap-6` → `gap-3 sm:gap-8`
- Facility highlight box: `p-6` → `p-4 sm:p-8`, inner H3 `text-2xl` → `text-lg sm:text-3xl`, paragraph `text-lg` → `text-sm sm:text-xl`, mini-grid `gap-4` → `gap-2.5`, mini-card `p-4` → `p-3`

**7. `src/components/FAQ.tsx`**
- Section `py-20` → `py-10 sm:py-20`
- Header `mb-12` → `mb-6 sm:mb-12`, H2 `text-4xl` → `text-2xl sm:text-4xl`, intro paragraph `mt-6` → `mt-3`
- Tabs: `gap-3` → `gap-2`, button `px-5 py-2.5 text-sm` → `px-3 py-1.5 text-xs sm:px-5 sm:py-2.5 sm:text-sm`, allow horizontal scroll without wrapping on mobile (`flex-nowrap overflow-x-auto`)
- Accordion item: trigger `px-6 py-4 text-lg` → `px-4 py-3 text-sm sm:text-lg`, content `px-6 pb-6 text-base` → `px-4 pb-4 text-sm sm:text-base`
- Bottom CTA: H3 `text-2xl mb-6` → `text-lg sm:text-2xl mb-3`, button `py-3 text-lg` → `py-2.5 text-sm sm:text-lg`

**8. `src/components/FinalCTA.tsx`**
- Section: `py-16` → `py-10 sm:py-20`
- H2: `text-3xl ... lg:text-6xl` → `text-2xl sm:text-4xl lg:text-6xl`, `mb-6` → `mb-3 sm:mb-6`
- Paragraph: `text-lg` → `text-sm sm:text-xl`, `mb-8` → `mb-5 sm:mb-10`, drop one sentence to single line on mobile via `leading-snug`
- CTAs: `py-4 sm:py-6 text-lg sm:text-xl px-12` → `py-3 text-sm px-6` on mobile
- Bottom 3-up cards: change to **3 columns on mobile** with compact style: `grid-cols-3 gap-2 sm:gap-8`, card `p-3 sm:p-8`, label `text-xs sm:text-2xl mb-1`, sub `text-[11px] sm:text-lg`

### Technical notes

- All changes are pure Tailwind class adjustments inside the JSX of the listed components — no logic, props, copy, or assets are removed.
- Breakpoint strategy: mobile-first defaults shrink, `sm:` (≥640px) restores existing tablet/desktop sizing so larger screens look unchanged.
- Line-clamp utility: confirm `tailwindcss/line-clamp` available (Tailwind 3.3+ ships it natively) — used for 2-line description clamps on cards.
- Respect existing memory rules: keep 24px+ rounded corners, white CTA buttons keep black text, no hyphens introduced, no Book Now / testimonials added.

### Out of scope

- Header, Footer, ServicePage, Tuning, VRX, Blog detail, About — only homepage + Services index per the request's "page" focus. Can extend in a follow-up if desired.

