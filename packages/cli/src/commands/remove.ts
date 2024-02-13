import type { ArgumentsCamelCase, Argv } from 'yargs';

import { keyValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { Diff } from '../utils/diff.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'remove';
export const description = 'Remove one localization string in files';

export function builder(yargs: Argv) {
	return keyValueOptions(pathOption(yargs), 'remove').usage(
		`\nExample:\n ${command} --path "path/to/file/or/directory" --keys "some_key" --values "or_some_value"`
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
	for (let [path, file] of files) {
		const diff = new Diff(path, file);

		if (keys) {
			file = file.deleteByKey(keys);
		}

		if (values) {
			file = file.deleteByValue(values);
		}

		const xml = file.toXML();
		await writeFile(path, xml);
		diff.print(xml);
	}
}
