# Owned T1.1 source correction snapshots

Three reconstructed before snapshots byte-match the pre-T1.1 captured file manifest: BrandWorkshopArticlePage.tsx, brands.ts and ar-brands.ts. Their original and current SHA-256 values and exact before/after copies are retained in verified-manifest.json. This compares to the actual T1.1 start, including prior T1 changes.

Brands.tsx has an explicit byte-snapshot limitation: its original mixed line-ending byte stream could not be reconstructed to the captured pre-T1.1 hash. Its saved before copy reverses exactly the single authorized BMW/Audi-only Arabic card conditional, but is not claimed byte-identical. The original captured hash, initial clean Git state and one-conditional application diff establish the correction scope. No broader Brands.tsx content change was made.

All four changes preserve other brands and existing service architecture. Final production HTML, type/build/validator checks and the comprehensive rendered BMW/Audi semantic audit cover the resulting behavior.
