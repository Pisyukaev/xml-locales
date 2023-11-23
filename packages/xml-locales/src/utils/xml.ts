import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import xmlFormatter from 'xml-formatter';
import type {
	X2jOptionsOptional,
	XmlBuilderOptionsOptional
} from 'fast-xml-parser';
import type { XMLFormatterOptions } from 'xml-formatter';

import type { XmlJson } from './types.js';

export interface XmlConstructor {
	parserOptions?: X2jOptionsOptional;
	builderOptions?: XmlBuilderOptionsOptional;
	formateOptions?: XMLFormatterOptions;
}

const defaultParserOptions: X2jOptionsOptional = {
	trimValues: false,
	ignoreDeclaration: true,
	attributeNamePrefix: 'key_',
	alwaysCreateTextNode: true,
	ignoreAttributes: false
};

const defaultBuilderOptions: XmlBuilderOptionsOptional = {
	ignoreAttributes: false,
	attributeNamePrefix: 'key_',
	processEntities: false
};

const defaultFormatterOptions: XMLFormatterOptions = {
	collapseContent: true,
	indentation: '  '
};

const defaultXmlOptions: XmlConstructor = {
	parserOptions: defaultParserOptions,
	builderOptions: defaultBuilderOptions,
	formateOptions: defaultFormatterOptions
};

export class XmlParser {
	private parser: XMLParser;
	private builder: XMLBuilder;
	private formatter: (xmlString: string) => string;

	constructor(xmlOptions?: XmlConstructor) {
		const { parserOptions, builderOptions, formateOptions } = {
			...(xmlOptions || {}),
			...defaultXmlOptions
		};

		this.parser = new XMLParser(parserOptions);
		this.builder = new XMLBuilder(builderOptions);
		this.formatter = (xmlString: string) =>
			xmlFormatter(xmlString, formateOptions);
	}

	xmlToJson(xmlData: string | Buffer): XmlJsonData {
		return new XmlJsonData(this.parser.parse(xmlData));
	}

	jsonToXml(xmlJson: XmlJson): string {
		return this.builder.build(xmlJson);
	}

	formate(xmlString: string): string {
		return this.formatter(xmlString);
	}
}

export class XmlJsonData {
	resources: XmlJson['resources'];

	constructor(xmlJson: XmlJson) {
		this.resources = xmlJson.resources;
	}
}
