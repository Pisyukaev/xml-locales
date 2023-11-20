import { add } from 'xml-locales';
import { modificationFile } from 'xml-locales/utils';
import type { ArgumentsCamelCase, Argv } from 'yargs';

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
		.option('sort', {
			alias: 's',
			desc: 'Sorted keys of strings by asc or desc',
			type: 'string'
		})
		.option('accept', {
			alias: 'y',
			desc: 'Accept add in all files',
			type: 'boolean',
			default: false
		})
		.usage(
			`\nExample:\n $0 ${command} --key key.of.string --value "locale string"`
		);
}

export async function handler({
	key,
	value,
	directory,
	sort,
	accept
}: ArgumentsCamelCase<{
	key: string;
	value: string;
	directory: string;
	sort?: 'asc' | 'desc';
	accept: boolean;
}>) {
	modificationFile(add({ key, directory, value, sort, accept }), directory);
}
