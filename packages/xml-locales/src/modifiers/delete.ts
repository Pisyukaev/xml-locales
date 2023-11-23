import { checkXmlKey } from '../utils/helpers.js';
import { XmlJsonData } from '../utils/xml.js';

export function deleteByKeyXmlNode(
	xmlData: XmlJsonData,
	key: string
): XmlJsonData {
	const hasKey = checkXmlKey(xmlData, key);
	if (!hasKey) return xmlData;

	const filteredNodes = xmlData.resources.string.filter(
		(element) => element.key_name !== key
	);

	return new XmlJsonData({ resources: { string: filteredNodes } });
}

export function deleteByValueXmlNode(
	xmlData: XmlJsonData,
	value: string
): XmlJsonData {
	const filteredNodes = xmlData.resources.string.filter(
		(element) => element['#text'] !== value
	);

	return new XmlJsonData({ resources: { string: filteredNodes } });
}
