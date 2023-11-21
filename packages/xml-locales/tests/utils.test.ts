import { describe, expect, test } from 'vitest';

import {
	checkKeyExist,
	checkKeyValueExist,
	replace,
	replaceValue
} from '../src/utils/helpers.js';
import {
	REPLACED_KEY_ELEMENTS,
	REPLACED_VALUE_ELEMENTS,
	STRING_ELEMENTS
} from './mock/data/stringElements.js';

describe('checkKeyExist', () => {
	test('has key', () => {
		const hasKey = checkKeyExist('testKey1', STRING_ELEMENTS);

		expect(hasKey).toBeTruthy();
	});

	test('has no key', () => {
		const hasKey = checkKeyExist('testKey', STRING_ELEMENTS);

		expect(hasKey).toBeFalsy();
	});
});

describe('replace', () => {
	test('replace key', () => {
		const replacedStrings = replace(STRING_ELEMENTS, 'testKey1', 'newKey');

		expect(replacedStrings).toMatchObject(REPLACED_KEY_ELEMENTS);
	});

	test('replace value', () => {
		const replacedStrings = replace(STRING_ELEMENTS, 'text1', 'newValue');

		expect(replacedStrings).toMatchObject(REPLACED_VALUE_ELEMENTS);
	});
});

describe('checkKeyValueExist', () => {
	describe('key', () => {
		test('key exist', () => {
			const hasKey = checkKeyValueExist('testKey1', STRING_ELEMENTS);
			expect(hasKey).toBeTruthy();
		});

		test('key no exist', () => {
			const hasKey = checkKeyValueExist('someKey', STRING_ELEMENTS);
			expect(hasKey).toBeFalsy();
		});
	});

	describe('value', () => {
		test('value exist', () => {
			const hasKey = checkKeyValueExist('text1', STRING_ELEMENTS);
			expect(hasKey).toBeTruthy();
		});

		test('value no exist', () => {
			const hasKey = checkKeyValueExist('someValue', STRING_ELEMENTS);
			expect(hasKey).toBeFalsy();
		});
	});
});

describe('replaceValue', () => {
	test('replaced value', () => {
		const replacedStrings = replaceValue(
			STRING_ELEMENTS,
			'testKey1',
			'newValue'
		);

		expect(replacedStrings).toMatchObject(REPLACED_VALUE_ELEMENTS);
	});

	test('does not replace value', () => {
		const replacedStrings = replaceValue(
			STRING_ELEMENTS,
			'someKey',
			'someValue'
		);

		expect(replacedStrings).toMatchObject(STRING_ELEMENTS);
	});
});
