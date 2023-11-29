import type { ArgumentsCamelCase, Argv } from 'yargs';

import { oldKeyOrValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'update';
export const description = 'Update key or value of localization string';

export function builder(yargs: Argv) {
	return oldKeyOrValueOptions(pathOption(yargs)).usage(
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
