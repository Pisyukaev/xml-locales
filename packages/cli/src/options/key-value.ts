import type { Argv } from 'yargs';

export function keyValueOptions(argv: Argv, action: string) {
	return argv
		.option('keys', {
			alias: 'k',
			desc: `Key(s) of ${action} string(s)`,
			type: 'array'
		})
		.option('values', {
			alias: 'v',
			desc: `Value(s) of ${action} string(s)`,
			type: 'array'
		});
}

export function oldKeyOrValueOptions(argv: Argv) {
	return argv
		.option('old', {
			alias: 'o',
			desc: 'Old key(s) or value(s) of update string(s)',
			demandOption: true,
			type: 'array'
		})
		.option('new', {
			alias: 'n',
			desc: 'New key(s) or value(s) of update string(s)',
			demandOption: true,
			type: 'array'
		});
}
