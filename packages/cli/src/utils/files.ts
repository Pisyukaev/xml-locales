import * as fs from 'node:fs/promises';
import { XmlLocales } from 'xml-locales';

async function scanPath(path: string): Promise<string[]> {
	const statPath = await fs.stat(path);

	if (statPath.isDirectory()) {
		const files = await fs.readdir(path);
		return files
			.filter((file) => file.endsWith('.xml'))
			.map((file) => `${path}/${file}`);
	}

	return [path];
}

export async function readFiles(path: string): Promise<[string, XmlLocales][]> {
	const paths = await scanPath(path);
	const files: [string, XmlLocales][] = [];

	for (const path of paths) {
		const xmlFile = await fs.readFile(path, 'utf-8');
		const xmlLocales = new XmlLocales(xmlFile);
		files.push([path, xmlLocales]);
	}

	return files;
}

export async function writeFile(path: string, content: string) {
	await fs.writeFile(path, content, 'utf-8');
}
