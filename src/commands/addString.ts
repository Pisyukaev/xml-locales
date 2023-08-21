import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import * as fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import xmlFormatter from 'xml-formatter';
import type { ArgumentsCamelCase, Argv } from 'yargs';

import { checkKeyExist, getFilesFromDir, replaceValue } from '../utils/files';
import { hasConflict } from '../utils/queries';

async function addString(key: string, value: string, directory: string) {
	let REPLACE_ALL = false;
	let NEED_REPLACE = false;
	try {
		const files = await getFilesFromDir(directory);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const fileData = await readFile(filePath, 'utf-8');

			const hasKey = checkKeyExist(key, fileData);

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
						break;
					}

					default:
						console.log('Cancelled');
						return;
				}
			}

			const needReplace = REPLACE_ALL || NEED_REPLACE;

			const actualFileData = needReplace
				? replaceValue(fileData, key, value)
				: fileData;

			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(actualFileData, 'text/xml');
			const resourcesNode = xmlDoc.getElementsByTagName('resources')[0];

			if (!resourcesNode) {
				console.log(`Node <resources> is not found in ${file}!`);
				break;
			}

			if (!hasKey) {
				const newLocalizationStr = xmlDoc.createElement('string');
				newLocalizationStr.setAttribute('name', key);
				newLocalizationStr.textContent = value;
				resourcesNode.appendChild(newLocalizationStr);
			}

			const newXml = new XMLSerializer().serializeToString(resourcesNode);
			const formattedXml = xmlFormatter(newXml, {
				collapseContent: true,
				indentation: '  '
			});

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

export const command = 'addString <key> <value> [directory]';
export const description = 'Add one localization string in files';

export function builder(yargs: Argv) {
	return yargs
		.option('key', {
			alias: 'k',
			desc: 'Key of adding string',
			requiresArg: true,
			type: 'string'
		})
		.option('value', {
			alias: 'v',
			desc: 'Value of adding string',
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
	value,
	directory
}: ArgumentsCamelCase<{ key: string; value: string; directory: string }>) {
	addString(key, value, directory);
}
