import { describe, expect, test } from 'vitest';

import { checkKeyExist, checkKeyValueExist, getFilesFromDir, replaceValue } from '../utils/files';
import { REPLACED_STRING_ELEMENTS, STRING_ELEMENTS } from './mock/data/stringElements';



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

describe('checkKeyExist', () => {
	test('has key', () => {
		const hasKey = checkKeyExist('testKey1', STRING_ELEMENTS)

		expect(hasKey).toBeTruthy()
	})

	test('has no key', () => {
		const hasKey = checkKeyExist('testKey', STRING_ELEMENTS)

		expect(hasKey).toBeFalsy()
	})
})

describe('checkKeyValueExist', () => {
	describe('key', () => {
		test('key exist', () => {
		const hasKey = checkKeyValueExist('testKey1', STRING_ELEMENTS)
		expect(hasKey).toBeTruthy()
		})

		test('key no exist', () => {
			const hasKey = checkKeyValueExist('someKey', STRING_ELEMENTS)
			expect(hasKey).toBeFalsy()
			})
	})

	describe('value', () => {
		test('value exist', () => {
			const hasKey = checkKeyValueExist('text1', STRING_ELEMENTS)
			expect(hasKey).toBeTruthy()
			})

			test('value no exist', () => {
				const hasKey = checkKeyValueExist('someValue', STRING_ELEMENTS)
				expect(hasKey).toBeFalsy()
				})
	})
})

describe('replaceValue', () => {
	test('replaced value', () => {
		const replacedStrings = replaceValue(STRING_ELEMENTS, 'testKey1', 'newValue')

		expect(replacedStrings).toMatchObject(REPLACED_STRING_ELEMENTS)
	})

	test('does not replace value', () => {
		const replacedStrings = replaceValue(STRING_ELEMENTS, 'someKey', 'someValue')

		expect(replacedStrings).toMatchObject(STRING_ELEMENTS)
	})
})
