import type { ArgumentsCamelCase, Argv } from 'yargs';

import { pathOption } from '../options/path.js';
import { readFiles, writeFile } from '../utils/files.js';
import { Diff } from '../utils/diff.js';

export const command = 'convert';
export const description = 'Convert XML localization files to JSON format';

export function builder(argv: Argv) {
	return pathOption(argv).usage(
		`\nExample:\n $0 ${command} --path "path/to/file/or/directory"`
	);
}

export async function handler({
	path
}: ArgumentsCamelCase<{
	path: string;
}>) {
	const files = await readFiles(path);

	for (const [filePath, xmlLocales] of files) {
		const xmlJsonData = xmlLocales.toJSON();
		const jsonData = convertToLocalizationJson(xmlJsonData);

		const newFilePath = filePath.replace('.xml', '.json');
		const diff = new Diff(newFilePath, xmlLocales);

		const json = JSON.stringify(jsonData, null, 2);

		await writeFile(newFilePath, json);
		diff.print(json);
	}
}

function convertToLocalizationJson(xmlJsonData: any): Record<string, string> {
	const result: Record<string, string> = {};

	if (xmlJsonData.resources && xmlJsonData.resources.string) {
		const strings = Array.isArray(xmlJsonData.resources.string)
			? xmlJsonData.resources.string
			: [xmlJsonData.resources.string];

		for (const stringItem of strings) {
			if (stringItem.key_name && stringItem['#text'] !== undefined) {
				result[stringItem.key_name] = stringItem['#text'];
			}
		}
	}

	return result;
}
