import { defineConfig } from 'tsup';

export default defineConfig([
	{
		entry: {
			bin: 'src/index.ts'
		},
		target: ['node16'],
		format: ['esm'],
		silent: true,
		minify: true,
		clean: true
	}
]);
