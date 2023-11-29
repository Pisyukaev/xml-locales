import type { Argv } from 'yargs';

export function keyValueOptions(argv: Argv, action: string) {
	return argv
		.option('key', {
			alias: 'k',
			desc: `Key of ${action} string`,
			type: 'string'
		})
		.option('value', {
			alias: 'v',
			desc: `Value of ${action} string`,
			type: 'string'
		});
}

export function oldKeyOrValueOptions(argv: Argv) {
	return argv
		.option('oldValue', {
			alias: 'o',
			desc: 'Old key or value of update string',
			demandOption: true,
			type: 'string'
		})
		.option('newValue', {
			alias: 'n',
			desc: 'New key or value of update string',
			demandOption: true,
			type: 'string'
		});
}
