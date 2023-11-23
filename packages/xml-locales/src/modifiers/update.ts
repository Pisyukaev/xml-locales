import { XmlJsonData } from '../utils/xml.js';

export function updateXmlNode(
	xmlData: XmlJsonData,
	oldValue: string,
	newValue: string
): XmlJsonData {
	const replacedNodes = xmlData.resources.string.map((element) => {
		if (element.key_name === oldValue) {
			return {
				...element,
				key_name: newValue
			};
		}

		if (element['#text'] === oldValue) {
			return {
				...element,
				'#text': newValue
			};
		}

		return element;
	});

	return new XmlJsonData({ resources: { string: replacedNodes } });
}
