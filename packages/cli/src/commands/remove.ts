import type { ArgumentsCamelCase, Argv } from 'yargs';

import { readFiles, writeFile } from '../utils/files.js';

export const command = 'remove';
export const description = 'Remove one localization string in files';

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
			desc: 'Key of remove string',
			type: 'string'
		})
		.option('value', {
			alias: 'v',
			desc: 'Value of remove string',
			type: 'string'
		})
		.usage(
			`\nExample:\n ${command} --path "path/to/file/or/directory" --key "some_key" --value "or_some_value"`
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
	for (let [path, file] of files) {
		if (key) {
			file = file.deleteByKey(key);
		}

		if (value) {
			file = file.deleteByValue(value);
		}

		await writeFile(path, file.toXML());
	}
}
