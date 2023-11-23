import { XmlJsonData } from '../utils/xml.js';

export function updateXmlNode(
	xmlData: XmlJsonData,
	oldKeyValue: string,
	newKeyValue: string
): XmlJsonData {
	const replacedNodes = xmlData.resources.string.map((element) => {
		if (element.key_name === oldKeyValue) {
			return {
				...element,
				key_name: newKeyValue
			};
		}

		if (element['#text'] === oldKeyValue) {
			return {
				...element,
				'#text': newKeyValue
			};
		}

		return element;
	});

	return new XmlJsonData({ resources: { string: replacedNodes } });
}
