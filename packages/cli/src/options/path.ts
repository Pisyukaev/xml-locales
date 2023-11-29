import type { Argv } from 'yargs';

export function pathOption(argv: Argv) {
	return argv.option('path', {
		alias: 'p',
		desc: 'Path of file or directory to adding string',
		demandOption: true,
		type: 'string',
		default: process.cwd()
	});
}
