import { XmlJsonData } from '../utils/xml.js';

export function deleteByKeyXmlNode(
	xmlData: XmlJsonData,
	keys: string[]
): XmlJsonData {
	const filteredNodes = xmlData.resources.string.filter(
		(element) => !keys.includes(element.key_name)
	);

	return new XmlJsonData({ resources: { string: filteredNodes } });
}

export function deleteByValueXmlNode(
	xmlData: XmlJsonData,
	values: string[]
): XmlJsonData {
	const filteredNodes = xmlData.resources.string.filter(
		(element) => !values.includes(element['#text'])
	);

	return new XmlJsonData({ resources: { string: filteredNodes } });
}
