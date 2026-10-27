# Compiler dependency bytes and resolution

Read-only snapshot 2026-10-26T10:40:17.382Z. No packages were installed or executed. 11/12 recipes resolve in both environments: **11 equal byte trees, 0 different byte trees**; 1 unavailable comparison(s).

| Package / actual parent resolver | Shared version | Frozen pnpm version | Package files |
|---|---|---|---|
| `vite` / project package.json | 5.4.21 | 5.4.21 | All equal |
| `@vitejs/plugin-react-swc` / project package.json | 3.11.0 | 3.11.0 | All equal |
| `tailwindcss` / project package.json | 3.4.19 | 3.4.19 | All equal |
| `postcss` / project package.json | 8.5.26 | 8.5.26 | All equal |
| `rollup` / vite | 4.63.1 | 4.63.1 | All equal |
| `esbuild` / vite | 0.21.5 | 0.21.5 | All equal |
| `postcss` / vite | 8.5.26 | 8.5.26 | All equal |
| `lightningcss` / vite | unavailable | unavailable | Unavailable |
| `@swc/core` / reactPlugin | 1.16.1 | 1.16.1 | All equal |
| `@rollup/rollup-win32-x64-msvc` / rollup | 4.63.1 | 4.63.1 | All equal |
| `@esbuild/win32-x64` / esbuild | 0.21.5 | 0.21.5 | All equal |
| `@swc/core-win32-x64-msvc` / swc | 1.16.1 | 1.16.1 | All equal |

[All resolved/real paths, exact file hashes and differences](comparison.json).

- This compares the named compiler/CSS package byte trees, not the entire transitive closure, environment variables, filesystem paths, build caches or every runtime input.
- node_modules subdirectories inside an owning package are excluded from its own tree and relevant nested dependencies are resolved separately through the specified parent.
- Different resolution paths are observed facts, but path-sensitive bundle output is only a hypothesis unless separately tested. Equal versions alone establish no byte equivalence.
- Any differing package bytes are evidence of an environment difference, not by themselves proof that a specific bundle difference was caused by those files.
- A missing optional package in both cohorts is recorded as unavailable, not as an installed-byte mismatch.
- No install, compiler invocation, configuration/source edit, network request or production action occurred.
