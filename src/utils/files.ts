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

export function checkKeyExist(key: string, fileData: string) {
	const matchedKey = new RegExp(`name="${key}"`);
	const hasKey = fileData.match(matchedKey);

	return hasKey;
}

export function replaceValue(fileData: string, key: string, newValue: string) {
	const replacedValue = new RegExp(`(?<=name="${key}">)(.*)(?=<\/string>)`);

	return fileData.replace(replacedValue, newValue);
}
