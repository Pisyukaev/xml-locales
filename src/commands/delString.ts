import type { ArgumentsCamelCase, Argv } from 'yargs';

import { del } from '../modifiers/delete';
import { modificationFile } from '../utils/files';

export const command = 'delete';
export const description = 'Delete one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('key', {
			alias: 'k',
			desc: 'Key or value of delete string',
			demandOption: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.option('sort', {
			alias: 's',
			desc: 'Sorted keys of strings by asc or desc',
			type: 'string'
		})
		.usage(
			`\nExample:\n ${command} --key key.of.string --directory src/locales`
		);
}

export async function handler({
	key: keyValue,
	directory,
	sort
}: ArgumentsCamelCase<{
	key: string;
	directory: string;
	sort?: 'asc' | 'desc';
}>) {
	modificationFile(del({ keyValue, sort }), directory);
}
