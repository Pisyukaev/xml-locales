import { addXmlNode } from './modifiers/add.js';
import {
	deleteByKeyXmlNode,
	deleteByValueXmlNode
} from './modifiers/delete.js';
import { sortXmlNodes } from './modifiers/sort.js';
import { updateXmlNode } from './modifiers/update.js';
import { XmlJsonData, XmlParser } from './utils/xml.js';
import type {
	AddOptions,
	SortDirection,
	UpdateOptions,
	XmlDataTypes
} from './utils/types.js';
import type { XmlConstructor } from './utils/xml.js';

export class XmlLocales {
	/** @internal */
	private readonly xmlParser: XmlParser;
	/** @internal */
	private xmlOptions?: XmlConstructor;
	/** @internal */
	private xmlData: XmlJsonData;

	constructor(
		xmlData?: string | Buffer | XmlJsonData,
		xmlOptions?: XmlConstructor
	) {
		this.xmlParser = new XmlParser(xmlOptions);
		this.xmlOptions = xmlOptions;
		this.parseXml(xmlData);
	}

	/** @internal */
	private parseXml(xmlData?: XmlDataTypes): void {
		if (xmlData instanceof XmlJsonData) {
			this.xmlData = xmlData;
			return;
		}

		if (xmlData) {
			const parsedXml = this.xmlParser.xmlToJson(xmlData);
			if (Array.isArray(parsedXml.resources.string)) {
				const filteredNodes = parsedXml.resources.string.filter(
					(element) => element !== undefined
				);

				this.xmlData = new XmlJsonData({
					resources: { string: filteredNodes }
				});
			} else {
				this.xmlData = new XmlJsonData({
					resources: { string: [parsedXml.resources.string] }
				});
			}
			return;
		}

		if (!this.xmlData) {
			throw new Error('XML data is not defined');
		}
	}

	/** @internal */
	private newInstance(): XmlLocales {
		return new XmlLocales(this.xmlData, this.xmlOptions);
	}

	add({ keys, values }: AddOptions): XmlLocales {
		for (let i = 0; i < keys.length; i++) {
			this.xmlData = addXmlNode(this.xmlData, keys[i]!, values[i]!);
		}

		return this.newInstance();
	}

	update({ newValues, oldValues }: UpdateOptions): XmlLocales {
		for (let i = 0; i < oldValues.length; i++) {
			this.xmlData = updateXmlNode(this.xmlData, oldValues[i]!, newValues[i]!);
		}

		return this.newInstance();
	}

	deleteByKey(keys: string[]): XmlLocales {
		this.xmlData = deleteByKeyXmlNode(this.xmlData, keys);
		return this.newInstance();
	}

	deleteByValue(values: string[]): XmlLocales {
		this.xmlData = deleteByValueXmlNode(this.xmlData, values);
		return this.newInstance();
	}

	sort(sortDirection: SortDirection): XmlLocales {
		this.xmlData = sortXmlNodes(this.xmlData, sortDirection);
		return this.newInstance();
	}

	toJSON(): XmlJsonData {
		return this.xmlData;
	}

	toXML(formate = true): string {
		const xmlString = this.xmlParser.jsonToXml(this.xmlData);
		if (formate) return this.xmlParser.formate(xmlString);
		return xmlString;
	}
}
