import { sort } from 'xml-locales';
import { modificationFile } from 'xml-locales/utils';
import type { ArgumentsCamelCase, Argv } from 'yargs';

export const command = 'sort';
export const description = 'Sorted keys of strings by asc or desc';

export function builder(yargs: Argv) {
	return yargs
		.option('direction', {
			alias: 'd',
			desc: 'Direction of key sort',
			type: 'string',
			default: 'asc'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.usage(`\nExample:\n ${command} --direction desc --directory src/locales`);
}

export async function handler({
	direction,
	directory
}: ArgumentsCamelCase<{ direction: 'asc' | 'desc'; directory: string }>) {
	modificationFile(sort({ direction }), directory);
}
