import { describe, expect, test } from 'vitest';

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
			const jsonXml = xmlLocales
				.add({ keys: ['key3'], values: ['value3'] })
				.toJSON();
			const newNode = jsonXml.resources.string[2];

			expect(newNode?.key_name).toBe('key3');
			expect(newNode?.['#text']).toBe('value3');
		});

		test('should add two new node', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales
				.add({ keys: ['key3', 'key4'], values: ['value3', 'value4'] })
				.toJSON();
			const firstNewNode = jsonXml.resources.string[2];
			const secondNewNode = jsonXml.resources.string[3];

			expect(firstNewNode?.key_name).toBe('key3');
			expect(firstNewNode?.['#text']).toBe('value3');

			expect(secondNewNode?.key_name).toBe('key4');
			expect(secondNewNode?.['#text']).toBe('value4');
		});

		test('should replace the value of the key', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales
				.add({ keys: ['key1'], values: ['value3'] })
				.toJSON();
			const newNode = jsonXml.resources.string[0];

			expect(newNode?.key_name).toBe('key1');
			expect(newNode?.['#text']).toBe('value3');
		});

		test('should replace two values of two keys', () => {
			const xmlLocales = new XmlLocales(xmlData);
			const jsonXml = xmlLocales
				.add({ keys: ['key1', 'key2'], values: ['value3', 'value4'] })
				.toJSON();
			const firstNewNode = jsonXml.resources.string[0];
			const secondNewNode = jsonXml.resources.string[1];

			expect(firstNewNode?.key_name).toBe('key1');
			expect(firstNewNode?.['#text']).toBe('value3');

			expect(secondNewNode?.key_name).toBe('key2');
			expect(secondNewNode?.['#text']).toBe('value4');
		});
	});

	describe('remove', () => {
		test('should remove a node of the key', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey(['key1']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value2');
		});

		test('should remove a node of the value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByValue(['value1']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value2');
		});

		test('should remove a node of two keys', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey(['key1', 'key2']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string.length).toBe(0);
		});

		test('not found key or value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey(['key3']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value1');
		});

		test('not found keys or values', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey(['key3', 'key4']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value1');
		});

		test('found one of keys', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.deleteByKey(['key3', 'key1']);
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('value2');
			expect(jsonXml.resources.string.length).toBe(1);
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
			xmlLocales.update({ oldValues: ['key1'], newValues: ['newKey1'] });
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.key_name).toBe('newKey1');
		});

		test('should update two keys', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({
				oldValues: ['key1', 'key2'],
				newValues: ['newKey1', 'newKey2']
			});
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.key_name).toBe('newKey1');
			expect(jsonXml.resources.string[1]?.key_name).toBe('newKey2');
		});

		test('should update one of two keys', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({
				oldValues: ['key1', 'ley2'],
				newValues: ['newKey1', 'newKey2']
			});
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.key_name).toBe('newKey1');
			expect(jsonXml.resources.string[1]?.key_name).toBe('key2');
		});

		test('should update value', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({ oldValues: ['value1'], newValues: ['newValue1'] });
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('newValue1');
		});

		test('should update two values', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({
				oldValues: ['value1', 'value2'],
				newValues: ['newValue1', 'newValue2']
			});
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('newValue1');
			expect(jsonXml.resources.string[1]?.['#text']).toBe('newValue2');
		});

		test('should update one of values', () => {
			const xmlLocales = new XmlLocales(xmlData);
			xmlLocales.update({
				oldValues: ['value1', 'balue2'],
				newValues: ['newValue1', 'newValue2']
			});
			const jsonXml = xmlLocales.toJSON();

			expect(jsonXml.resources.string[0]?.['#text']).toBe('newValue1');
			expect(jsonXml.resources.string[1]?.['#text']).toBe('value2');
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
