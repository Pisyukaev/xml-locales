import type { SortDirection } from 'xml-locales';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { directionOption } from '../options/direction.js';
import { pathOption } from '../options/path.js';
import { readFiles, writeFile } from '../utils/files.js';

export const command = 'sort';
export const description = 'Sorted keys of strings by asc or desc';

export function builder(yargs: Argv) {
	return directionOption(pathOption(yargs)).usage(
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
