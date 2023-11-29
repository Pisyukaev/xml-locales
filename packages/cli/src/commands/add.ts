import type { ArgumentsCamelCase, Argv } from 'yargs';

import { keyValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'add';
export const description = 'Add one localization string in files';

export function builder(argv: Argv) {
	return keyValueOptions(pathOption(argv), 'add').usage(
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
