import { describe, expect, test } from 'vitest';

import {
	checkKeyValueExist,
	checkXmlKey,
	replaceXmlNodeValue
} from './helpers.js';

const xmlData = {
	resources: {
		string: [
			{
				key_name: 'key1',
				'#text': 'value1'
			},
			{
				key_name: 'key2',
				'#text': 'value2'
			}
		]
	}
};

describe('checkXmlKey', () => {
	test('should return true if key exist', () => {
		expect(checkXmlKey(xmlData, 'key1')).toBe(true);
	});

	test('should return false if key does not exist', () => {
		expect(checkXmlKey(xmlData, 'key3')).toBe(false);
	});
});

describe('checkKeyValueExist', () => {
	test('should return true if key value exist', () => {
		expect(checkKeyValueExist('value1', xmlData.resources.string)).toBe(true);
	});

	test('should return false if key value does not exist', () => {
		expect(checkKeyValueExist('value3', xmlData.resources.string)).toBe(false);
	});
});

describe('replaceXmlNodeValue', () => {
	test('should replace the value of the key', () => {
		const newXmlData = replaceXmlNodeValue(xmlData, 'key1', 'value3');
		expect(newXmlData.resources.string[0]?.['#text']).toBe('value3');
	});
});
