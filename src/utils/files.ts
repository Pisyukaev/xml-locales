import * as fs from 'fs';

export function getFilesFromDir(dirName: string) {
	return new Promise<string[]>((resolve, reject) => {
		fs.readdir(dirName, (err, files) => {
			if (err) {
				reject(err);
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
