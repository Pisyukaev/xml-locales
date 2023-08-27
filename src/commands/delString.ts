import * as fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { checkKeyValueExist, getFilesFromDir } from '../utils/files';
import { deleteAnswer } from '../utils/queries';
import { Xml } from '../utils/xml';

async function delString(keyValue: string, directory: string) {
	let DELETE_ALL = false;
	let NEED_DELETE = false;
	try {
		const files = await getFilesFromDir(directory);

		for (const file of files) {
			const xml = new Xml();
			const filePath = path.join(directory, file);
			const fileData = await readFile(filePath, 'utf-8');

			const jsonXml = xml.xmlToJson(fileData);
			const {
				resources: { string }
			} = jsonXml;

			const hasKeyValue = checkKeyValueExist(keyValue, string);

			if (!DELETE_ALL && hasKeyValue) {
				const answer = await deleteAnswer(file);

				switch (answer) {
					case 'yes': {
						NEED_DELETE = true;
						break;
					}
					case 'all': {
						DELETE_ALL = true;
						break;
					}
					case 'skip': {
						NEED_DELETE = false;
						break;
					}

					default:
						console.log('Cancelled');
						return;
				}
			}

			const needDelete = DELETE_ALL || NEED_DELETE;

			if (needDelete) {
				const filteredStrings = string.filter(
					(element) =>
						element['#text'] !== keyValue && element.key_name !== keyValue
				);

				jsonXml.resources.string = filteredStrings;
			}

			const xmlString = xml.jsonToXml(jsonXml);

			fs.writeFile(filePath, xmlString, (err) => {
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

export const command = 'delString <key|value> [directory]';
export const description = 'Delete one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('key', {
			alias: 'k',
			desc: 'Key or value of delete string',
			requiresArg: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		});
}

export async function handler({
	key,
	directory
}: ArgumentsCamelCase<{ key: string; directory: string }>) {
	delString(key, directory);
}
