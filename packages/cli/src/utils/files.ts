import fs from 'node:fs/promises';
import { XmlLocales } from 'xml-locales';

async function scanPath(path: string): Promise<string[]> {
	try {
		const statPath = await fs.stat(path);

		if (statPath.isDirectory()) {
			const paths = await fs.readdir(path);
			return paths
				.filter((file) => file.endsWith('.xml'))
				.map((file) => `${path}/${file}`);
		}
	} catch (err) {
		throw new Error(
			`Error scanning or reading path "${path}": ${(err as Error).message}`
		);
	}

	if (path.endsWith('.xml')) {
		return [path];
	}

	return [];
}

export async function readFiles(path: string): Promise<[string, XmlLocales][]> {
	const paths = await scanPath(path);
	try {
		const files: [string, XmlLocales][] = [];

		for (const path of paths) {
			const xmlFile = await fs.readFile(path, 'utf-8');
			const xmlLocales = new XmlLocales(xmlFile);
			files.push([path, xmlLocales]);
		}

		return files;
	} catch (err) {
		throw new Error(`Error reading file "${path}": ${(err as Error).message}`);
	}
}

export async function writeFile(path: string, content: string): Promise<void> {
	try {
		await fs.writeFile(path, content, 'utf-8');
	} catch (err) {
		throw new Error(`Error writing file "${path}": ${(err as Error).message}`);
	}
}
