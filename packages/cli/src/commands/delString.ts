import { del } from 'xml-locales';
import { modificationFile } from 'xml-locales/utils';
import type { ArgumentsCamelCase, Argv } from 'yargs';

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
		.option('accept', {
			alias: 'y',
			desc: 'Accept delete in all files',
			type: 'boolean',
			default: false
		})
		.usage(
			`\nExample:\n ${command} --key key.of.string --directory src/locales`
		);
}

export async function handler({
	key: keyValue,
	directory,
	sort,
	accept
}: ArgumentsCamelCase<{
	key: string;
	directory: string;
	sort?: 'asc' | 'desc';
	accept: boolean;
}>) {
	modificationFile(del({ keyValue, sort, accept }), directory);
}
