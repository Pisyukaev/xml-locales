import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import xmlFormatter from 'xml-formatter';
import type {
	X2jOptionsOptional,
	XmlBuilderOptionsOptional
} from 'fast-xml-parser';
import type { XMLFormatterOptions } from 'xml-formatter';

interface XmlConstructor {
	parserOptions?: X2jOptionsOptional;
	builderOptions?: XmlBuilderOptionsOptional;
	formateOptions?: XMLFormatterOptions;
}

const defaultParserOptions: X2jOptionsOptional = {
	trimValues: true,
	ignoreDeclaration: true,
	attributeNamePrefix: 'key_',
	alwaysCreateTextNode: true,
	ignoreAttributes: false
};

const defaultBuilderOptions: XmlBuilderOptionsOptional = {
	ignoreAttributes: false,
	attributeNamePrefix: 'key_'
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

export class Xml {
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

	xmlToJson(xmlData: string): XmlJson {
		return this.parser.parse(xmlData);
	}

	jsonToXml(xmlJson: XmlJson, needFormate: boolean = true): string {
		const xmlString = this.builder.build(xmlJson);

		if (needFormate) {
			return this.formate(xmlString);
		}

		return xmlString;
	}

	formate(xmlString: string): string {
		return this.formatter(xmlString);
	}
}
