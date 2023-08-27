import * as fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { checkKeyExist, getFilesFromDir, replaceValue } from '../utils/files';
import { hasConflict } from '../utils/queries';
import { Xml } from '../utils/xml';

async function addString(key: string, value: string, directory: string) {
	let REPLACE_ALL = false;
	let NEED_REPLACE = false;
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

			const hasKey = checkKeyExist(key, string);

			if (!REPLACE_ALL && hasKey) {
				const answer = await hasConflict(file);

				switch (answer) {
					case 'yes': {
						NEED_REPLACE = true;
						break;
					}
					case 'all': {
						REPLACE_ALL = true;
						break;
					}
					case 'skip': {
						NEED_REPLACE = false;
						break;
					}

					default:
						console.log('Cancelled');
						return;
				}
			}

			const needReplace = REPLACE_ALL || NEED_REPLACE;

			if (needReplace) {
				const replacedStrings = replaceValue(string, key, value);

				jsonXml.resources.string = replacedStrings;
			}

			if (!hasKey) {
				jsonXml.resources.string.push({
					key_name: key,
					'#text': value
				});
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

export const command = 'add';
export const description = 'Add one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('key', {
			alias: 'k',
			desc: 'Key of adding string',
			demandOption: true,
			type: 'string'
		})
		.option('value', {
			alias: 'v',
			desc: 'Value of adding string',
			demandOption: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.usage(
			`\nExample:\n $0 ${command} --key key.of.string --value "locale string"`
		);
}

export async function handler({
	key,
	value,
	directory
}: ArgumentsCamelCase<{ key: string; value: string; directory: string }>) {
	addString(key, value, directory);
}
