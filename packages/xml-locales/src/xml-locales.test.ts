import { describe, expect, test } from 'vitest';
import { c } from 'vitest/dist/reporters-5f784f42.js';

import { XmlLocales } from './xml-locales.js';

const xmlData = `<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>`;

const oneStringXmlData = `<resources>
  <string name="key1">value1</string>
</resources>`;

describe('XmlLocales', () => {
	describe('add', () => {
		test('should add new node', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales.add({ key: 'key3', value: 'value3' }).toJSON();
			const newNode = jsonXml.resources.string[2];

			expect(newNode?.key_name).toBe('key3');
			expect(newNode?.['#text']).toBe('value3');
		});

		test('should replace the value of the key', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales.add({ key: 'key1', value: 'value3' }).toJSON();
			const newNode = jsonXml.resources.string[0];

			expect(newNode?.key_name).toBe('key1');
			expect(newNode?.['#text']).toBe('value3');
		});
	});

	describe('remove', () => {
		test('should remove a node of the key', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey('key1');
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value2');
		});

		test('should remove a node of the value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByValue('value1');
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value2');
		});

		test('not found key or value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey('key3');
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value1');
		});
	});

	describe('sort', () => {
		test('should sorted by "asc"', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.sort('asc');
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.key_name).toBe('key1');
		});

		test('should sorted by "desc"', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.sort('desc');
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[1]?.key_name).toBe('key1');
		});
	});

	describe('update', () => {
		test('should update key', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({ oldValue: 'key1', newValue: 'newKey1' });
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.key_name).toBe('newKey1');
		});

		test('should update value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({ oldValue: 'value1', newValue: 'newValue1' });
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('newValue1');
		});
	});

	describe('XmlLocales constructor', () => {
		test('should throw error if xml data is not defined', () => {
			expect(() => new XmlLocales()).toThrow('XML data is not defined');
		});

		test('constructor should parse xml data', () => {
			const xmlLocales = new XmlLocales(oneStringXmlData);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml).toMatchSnapshot();
		});

		test('should return json object', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml).toMatchSnapshot();
		});
	});

	describe('to XML', () => {
		test('should return xml string with formatting', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const xmlString = xmlLocales.toXML();

			expect(xmlString).toMatchSnapshot();
		});

		test('should return xml string without formatting', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const xmlString = xmlLocales.toXML(false);

			expect(xmlString).toMatchSnapshot();
		});
	});
});
