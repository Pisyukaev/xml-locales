import type { Argv } from 'yargs';

export function directionOption(argv: Argv) {
	return argv.option('direction', {
		alias: 'd',
		desc: 'Direction of key sort',
		type: 'string',
		default: 'asc',
		choices: ['asc', 'desc']
	});
}
