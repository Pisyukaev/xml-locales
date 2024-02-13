import type { ArgumentsCamelCase, Argv } from 'yargs';

import { oldKeyOrValueOptions } from '../options/key-value.js';
import { pathOption } from '../options/path.js';
import { Diff } from '../utils/diff.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'update';
export const description = 'Update key or value of localization string';

export function builder(yargs: Argv) {
	return oldKeyOrValueOptions(pathOption(yargs)).usage(
		`\nExample:\n ${command} --path "path/to/file/or/directory" --old "some_key_or_value" --new "some_new_key_or_value"`
	);
}

export async function handler({
	old: oldValues,
	new: newValues,
	path
}: ArgumentsCamelCase<{
	old: string[];
	new: string[];
	path: string;
}>) {
	const files = await readFiles(path);
	for (const [path, file] of files) {
		const diff = new Diff(path, file);

		if (oldValues.length !== newValues.length) {
			throw new Error('The number of old and new values must be the same');
		}

		const xml = file.update({ oldValues, newValues }).toXML();
		await writeFile(path, xml);
		diff.print(xml);
	}
}
