import { checkXmlKey, replaceXmlNodeValue } from '../utils/helpers.js';
import { XmlJsonData } from '../utils/xml.js';

export function addXmlNode(
	xmlData: XmlJsonData,
	key: string,
	value: string
): XmlJsonData {
	const hasKey = checkXmlKey(xmlData, key);
	if (hasKey) {
		return replaceXmlNodeValue(xmlData, key, value);
	} else {
		xmlData.resources.string.push({
			key_name: key,
			'#text': value
		});
		return xmlData;
	}
}
