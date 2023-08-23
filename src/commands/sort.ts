import * as fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { getFilesFromDir, sortBy } from '../utils/files';
import { xmlBuilder, xmlFormate, xmlParser } from '../utils/xml';

async function sort(direction: 'asc' | 'desc', directory: string) {
	try {
		const files = await getFilesFromDir(directory);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const fileData = await readFile(filePath, 'utf-8');

			const jsonXml: XmlJson = xmlParser.parse(fileData);
			const {
				resources: { string }
			} = jsonXml;

			const sortedString = sortBy(string, direction);

			jsonXml.resources.string = sortedString;

			const xmlString = xmlBuilder.build(jsonXml);
			const formattedXml = xmlFormate(xmlString);

			fs.writeFile(filePath, formattedXml, (err) => {
				if (err) {
					console.log(`Error at write file ${file}`);

					return;
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export const command = 'sort [direction] [directory]';
export const description = 'Sorted keys of strings by asc or desc';

export function builder(yargs: Argv) {
	return yargs
		.option('direction', {
			alias: 'd',
			desc: 'Direction of key sort',
			type: 'string',
			default: 'asc'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		});
}

export async function handler({
	direction,
	directory
}: ArgumentsCamelCase<{ direction: 'asc' | 'desc'; directory: string }>) {
	sort(direction, directory);
}
