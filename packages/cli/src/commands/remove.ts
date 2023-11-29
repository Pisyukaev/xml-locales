import type { ArgumentsCamelCase, Argv } from 'yargs';

import { keyValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'remove';
export const description = 'Remove one localization string in files';

export function builder(yargs: Argv) {
	return keyValueOptions(pathOption(yargs), 'remove').usage(
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
