

## Fix Brands We Serve Mobile Layout

### Problem
On mobile (390px wide), 13 brand logos are orbiting in a tiny ellipse (140x100px radius), causing them to overlap and clamp together. The orbital approach doesn't work well on small screens with this many brands.

### Solution: Switch to a scrollable grid on mobile, keep orbit on desktop

**File: `src/components/BrandsWeServe.tsx`**

- **Mobile (< 768px)**: Replace the orbital layout with a clean grid of brand logos (3 columns, evenly spaced). No orbit animation on mobile — just a static, tappable grid with hover/tap effects. Each logo gets proper spacing and size (w-20 h-20).
- **Desktop (>= 768px)**: Keep the existing orbital system unchanged.
- Reduce the section height on mobile from `min-h-screen` to auto-height.
- Remove the drag/parallax logic from mobile since it doesn't apply to the grid.
- Keep tooltips on desktop; on mobile, show brand name below each logo instead.

### Changes
1. Use the `useIsMobile` hook to detect screen size
2. Conditionally render grid layout (mobile) vs orbital layout (desktop)
3. Mobile grid: 3-column grid with `gap-6`, each logo in a rounded container with the brand name underneath in small text
4. Remove `min-h-screen` on mobile, use appropriate padding instead

