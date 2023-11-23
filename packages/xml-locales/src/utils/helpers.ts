import { XmlJsonData } from './xml.js';
import type { XmlNode } from './types.js';

export function checkXmlKey(xmlData: XmlJsonData, key: string): boolean {
	return xmlData.resources.string.some((element) => element.key_name === key);
}

export function checkKeyValueExist(
	keyValue: string,
	strElement: XmlNode[]
): boolean {
	return strElement.some(
		(element) => element['#text'] === keyValue || element.key_name === keyValue
	);
}

export function replaceXmlNodeValue(
	xmlData: XmlJsonData,
	key: string,
	newValue: string
): XmlJsonData {
	const replacedStrings = xmlData.resources.string.map((element) => {
		if (element.key_name === key) {
			return {
				...element,
				'#text': newValue
			};
		}

		return element;
	});

	return new XmlJsonData({ resources: { string: replacedStrings } });
}
