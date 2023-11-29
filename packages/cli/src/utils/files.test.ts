import { describe, expect, test } from 'vitest';
import { XmlLocales } from 'xml-locales';

import { readFiles, writeFile } from './files';

describe('readFiles', () => {
	test('reads a single file', async () => {
		const files = await readFiles('packages/cli/mock/locales/strings1.xml');
		expect(files).toHaveLength(1);

		const [file1] = files;

		expect(file1![0]).toBe('packages/cli/mock/locales/strings1.xml');
		expect(file1![1]).toBeInstanceOf(XmlLocales);
	});

	test('reads a directory', async () => {
		const files = await readFiles('packages/cli/mock/locales');
		expect(files).toHaveLength(2);

		const [file1, file2] = files;

		expect(file1![0]).toBe('packages/cli/mock/locales/strings1.xml');
		expect(file1![1]).toBeInstanceOf(XmlLocales);

		expect(file2![0]).toBe('packages/cli/mock/locales/strings2.xml');
		expect(file2![1]).toBeInstanceOf(XmlLocales);
	});

	test('reads directory without xml files', async () => {
		const files = await readFiles('packages/');
		expect(files).toHaveLength(0);
	});

	test('reads a file is not xml', async () => {
		const files = await readFiles('packages/cli/mock/locales/notXml.txt');
		expect(files).toHaveLength(0);
	});

	describe('errors', () => {
		test('throws an error if file path does not exist', async () => {
			try {
				await readFiles('locales/doesNotExist.xml');
			} catch (e: any) {
				expect(e.message).toBe(
					`Error scanning or reading path "locales/doesNotExist.xml": ENOENT: no such file or directory, stat 'locales/doesNotExist.xml'`
				);
			}
		});

		test('throws an error if directory path does not exist', async () => {
			try {
				await readFiles('path/does/not/exist');
			} catch (e: any) {
				expect(e.message).toBe(
					`Error scanning or reading path "path/does/not/exist": ENOENT: no such file or directory, stat 'path/does/not/exist'`
				);
			}
		});
	});
});

describe('writeFile', () => {
	test('writes a file', async () => {
		await writeFile(
			'packages/cli/mock/locales/strings1.xml',
			`<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>`
		);
	});
});
