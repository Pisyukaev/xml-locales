import { SortDirection } from 'xml-locales';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { readFiles, writeFile } from '../utils/files.js';

export const command = 'sort';
export const description = 'Sorted keys of strings by asc or desc';

export function builder(yargs: Argv) {
	return yargs
		.option('path', {
			alias: 'p',
			desc: 'Path of file or directory to adding string',
			demandOption: true,
			type: 'string',
			default: process.cwd()
		})
		.option('direction', {
			alias: 'd',
			desc: 'Direction of key sort',
			type: 'string',
			default: 'asc',
			choices: ['asc', 'desc']
		})
		.usage(
			`\nExample:\n ${command} --path "path/to/file/or/directory" --direction "desc"`
		);
}

export async function handler({
	path,
	direction
}: ArgumentsCamelCase<{ path: string; direction: SortDirection }>) {
	const files = await readFiles(path);
	for (const [path, file] of files) {
		await writeFile(path, file.sort(direction).toXML());
	}
}
