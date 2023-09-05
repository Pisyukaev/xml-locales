import type { ArgumentsCamelCase, Argv } from 'yargs';

import { add } from '../modifiers/add';
import { modificationFile } from '../utils/files';

export const command = 'add';
export const description = 'Add one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('key', {
			alias: 'k',
			desc: 'Key of adding string',
			demandOption: true,
			type: 'string'
		})
		.option('value', {
			alias: 'v',
			desc: 'Value of adding string',
			demandOption: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.usage(
			`\nExample:\n $0 ${command} --key key.of.string --value "locale string"`
		);
}

export async function handler({
	key,
	value,
	directory
}: ArgumentsCamelCase<{ key: string; value: string; directory: string }>) {
	modificationFile(add({ key, directory, value }), directory);
}
