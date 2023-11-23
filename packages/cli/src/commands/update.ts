import type { ArgumentsCamelCase, Argv } from 'yargs';

import { readFiles, writeFile } from '../utils/files.js';

export const command = 'update';
export const description = 'Update key or value of localization string';

export function builder(yargs: Argv) {
	return yargs
		.option('path', {
			alias: 'p',
			desc: 'Path of file or directory to adding string',
			demandOption: true,
			type: 'string',
			default: process.cwd()
		})
		.option('oldValue', {
			alias: 'o',
			desc: 'Old key or value of changing string',
			demandOption: true,
			type: 'string'
		})
		.option('newValue', {
			alias: 'n',
			desc: 'New key or value of changing string',
			demandOption: true,
			type: 'string'
		})
		.usage(
			`\nExample:\n ${command} --path "path/to/file/or/directory" --old "some_key_or_value" --new "some_new_key_or_value"`
		);
}

export async function handler({
	oldValue,
	newValue,
	path
}: ArgumentsCamelCase<{
	oldValue: string;
	newValue: string;
	path: string;
}>) {
	const files = await readFiles(path);
	for (const [path, file] of files) {
		await writeFile(path, file.update({ oldValue, newValue }).toXML());
	}
}
