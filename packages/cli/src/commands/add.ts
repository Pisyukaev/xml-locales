import type { ArgumentsCamelCase, Argv } from 'yargs';

import { readFiles, writeFile } from '../utils/files.js';

export const command = 'add';
export const description = 'Add one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('path', {
			alias: 'p',
			desc: 'Path of file or directory to adding string',
			demandOption: true,
			type: 'string',
			default: process.cwd()
		})
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
		.usage(
			`\nExample:\n $0 ${command} --path "path/to/file/or/directory" --key "some_key" --value "some_value"`
		);
}

export async function handler({
	key,
	value,
	path
}: ArgumentsCamelCase<{
	key: string;
	value: string;
	path: string;
}>) {
	const files = await readFiles(path);
	for (const [path, file] of files) {
		await writeFile(path, file.add({ key, value }).toXML());
	}
}
