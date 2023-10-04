import { describe, expect, test } from 'vitest';

import { getFilesFromDir } from '../utils/files';

describe('Get xml files path', () => {
	test('Files in mock folder', async () => {
		const paths = await getFilesFromDir('src/tests/mock/locales');

		expect(paths).toMatchObject(['strings-en.xml', 'strings.xml']);
	});

	test('Folder have not xml files', async () => {
		const paths = getFilesFromDir('src');

		expect(paths).rejects.toThrow('Not all files have *.xml extension');
	});
});
