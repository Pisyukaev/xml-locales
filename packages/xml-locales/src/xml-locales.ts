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
				this.xmlData = parsedXml;
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

	add(options: AddOptions): XmlLocales {
		this.xmlData = addXmlNode(this.xmlData, options.key, options.value);
		return this.newInstance();
	}

	update(options: UpdateOptions): XmlLocales {
		this.xmlData = updateXmlNode(
			this.xmlData,
			options.oldValue,
			options.newValue
		);
		return this.newInstance();
	}

	deleteByKey(key: string): XmlLocales {
		this.xmlData = deleteByKeyXmlNode(this.xmlData, key);
		return this.newInstance();
	}

	deleteByValue(value: string): XmlLocales {
		this.xmlData = deleteByValueXmlNode(this.xmlData, value);
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
