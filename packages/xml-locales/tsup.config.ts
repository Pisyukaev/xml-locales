import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts', 'src/utils/index.ts'],
	target: 'node20',
	format: ['esm'],
	banner: {
		js: `
// BANNER START
const require = (await import("node:module")).createRequire(import.meta.url);
const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
const __dirname = (await import("node:path")).dirname(__filename);
// BANNER END
`
	},
	minify: false,
	sourcemap: true,
	clean: true,
	dts: true
});
