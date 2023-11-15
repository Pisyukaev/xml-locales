import * as fs from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';

import { Xml } from './xml';

export function getFilesFromDir(dirName: string) {
	return new Promise<string[]>((resolve, reject) => {
		fs.readdir(dirName, (err, files) => {
			if (err) {
				reject(err);
				return;
			}

			const allFileIsXML = files.every((file) => file.endsWith('xml'));

			if (!allFileIsXML) {
				reject('Not all files have *.xml extension');
				return;
			}
			resolve(files);
		});
	});
}

export function checkKeyExist(key: string, strElements: StringElement[]) {
	return strElements.find(
		({ key_name }: { key_name: string }) => key_name === key
	);
}

export function checkKeyValueExist(
	keyValue: string,
	strElement: StringElement[]
) {
	return strElement.find(
		(element) => element['#text'] === keyValue || element.key_name === keyValue
	);
}

export function replaceValue(
	strElements: StringElement[],
	key: string,
	newValue: string
) {
	const replacedStrings = strElements.map((element) => {
		if (element.key_name === key) {
			return {
				...element,
				'#text': newValue
			};
		}

		return element;
	});

	return replacedStrings;
}

export function replace(
	strElements: StringElement[],
	oldKeyValue: string,
	newKeyValue: string
) {
	const replaced = strElements.map((element) => {
		if (element.key_name === oldKeyValue) {
			return {
				...element,
				key_name: newKeyValue
			};
		}

		if (element['#text'] === oldKeyValue) {
			return {
				...element,
				'#text': newKeyValue
			};
		}

		return element;
	});

	return replaced;
}

export async function modificationFile(
	callback: ({
		filePath,
		jsonXml
	}: {
		filePath: string;
		jsonXml: XmlJson;
	}) => Promise<XmlJson | undefined> | XmlJson,
	directory: string = './'
) {
	try {
		const files = await getFilesFromDir(directory);

		for (const fileName of files) {
			const xml = new Xml();

			const filePath = path.join(directory, fileName);
			const fileData = await readFile(filePath, 'utf-8');

			const jsonXml = xml.xmlToJson(fileData);

			const modifiedJson = await callback({ filePath, jsonXml });

			if (!modifiedJson) {
				throw Error('Error during file modified');
			}
			const xmlString = xml.jsonToXml(modifiedJson);

			fs.writeFile(filePath, xmlString, (err) => {
				if (err) {
					console.log(`Error at write file ${fileName}`);

					return;
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
}
