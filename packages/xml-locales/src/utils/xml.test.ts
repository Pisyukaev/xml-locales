import { describe, expect, test } from 'vitest';

import {
	checkKeyValueExist,
	checkXmlKey,
	replaceXmlNodeValue
} from './helpers.js';
import { XmlJsonData, XmlParser } from './xml.js';

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`;

describe('XmlParser', () => {
	test('should parse xml to json', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		expect(jsonData).toMatchObject({
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
		});
	});

	test('should parse json to xml', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		const xmlString = xmlParser.jsonToXml(jsonData);
		expect(xmlString).toMatchSnapshot();
	});

	test('should format xml string', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		const xmlString = xmlParser.jsonToXml(jsonData);
		const formattedXmlString = xmlParser.formate(xmlString);
		expect(formattedXmlString).toMatchSnapshot();
	});
});

describe('XmlJsonData', () => {
	test('should check if key exist', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		const xmlJsonData = new XmlJsonData(jsonData);

		expect(checkXmlKey(xmlJsonData, 'key1')).toBe(true);
		expect(checkXmlKey(xmlJsonData, 'key3')).toBe(false);
	});

	test('should check if key value exist', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		const xmlJsonData = new XmlJsonData(jsonData);
		expect(checkKeyValueExist('value1', xmlJsonData.resources.string)).toBe(
			true
		);
		expect(checkKeyValueExist('value3', xmlJsonData.resources.string)).toBe(
			false
		);
	});

	test('should replace the value of the key', () => {
		const xmlParser = new XmlParser();
		const jsonData = xmlParser.xmlToJson(xmlData);
		const xmlJsonData = new XmlJsonData(jsonData);

		expect(
			checkKeyValueExist(
				'value3',
				replaceXmlNodeValue(xmlJsonData, 'key1', 'value3').resources.string
			)
		).toBe(true);
	});
});
