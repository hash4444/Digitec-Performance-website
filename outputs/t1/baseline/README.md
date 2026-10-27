# T1 baseline

T1_BASELINE_HEAD: 546e02fb214212e187c159c303fda2354d480ff3

Branch: main. Initial working tree clean.

- TypeScript: passed.
- npm run build: passed outside filesystem sandbox after an initial esbuild directory-access failure.
- Public routes: 1,247. Sitemap canonical URLs: 996.
- Build SEO/routing validators: passed. Additional master SEO, BMW hub, paint-care cluster validators: passed.
- Standalone legacy production-router test: failed on request object identity at line 25 before T1 implementation. Baseline log retained. Current hosting guard tests pass.
- Sitewide baseline errors: .

The build regenerated a machine-local MCP import and unrelated historical audit artifacts. Their baseline versions were restored after evidence copies were saved. No backend changes belong to T1.
