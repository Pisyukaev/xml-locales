import type { ArgumentsCamelCase, Argv } from 'yargs';

import { keyValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { Diff } from '../utils/diff.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'add';
export const description = 'Add one localization string in files';

export function builder(argv: Argv) {
	return keyValueOptions(pathOption(argv), 'add').usage(
		`\nExample:\n $0 ${command} --path "path/to/file/or/directory" --keys "some_key" --values "some_value"`
	);
}

export async function handler({
	keys,
	values,
	path
}: ArgumentsCamelCase<{
	keys: string[];
	values: string[];
	path: string;
}>) {
	const files = await readFiles(path);
	for (const [path, file] of files) {
		const diff = new Diff(path, file);

		if (keys.length !== values.length) {
			throw new Error('The number of keys and values must be the same');
		}

		const xml = file.add({ keys, values }).toXML();
		await writeFile(path, xml);
		diff.print(xml);
	}
}
