import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import xmlFormatter from 'xml-formatter';
import type {
	X2jOptionsOptional,
	XmlBuilderOptionsOptional
} from 'fast-xml-parser';
import type { XMLFormatterOptions } from 'xml-formatter';

const parserOptions: X2jOptionsOptional = {
	trimValues: true,
	ignoreDeclaration: true,
	attributeNamePrefix: 'key_',
	alwaysCreateTextNode: true,
	ignoreAttributes: false
};

const builderOptions: XmlBuilderOptionsOptional = {
	ignoreAttributes: false,
	attributeNamePrefix: 'key_'
};

const formatterOptions: XMLFormatterOptions = {
	collapseContent: true,
	indentation: '  '
};

export const xmlParser = new XMLParser(parserOptions);
export const xmlBuilder = new XMLBuilder(builderOptions);
export function xmlFormate(
	xmlString: string,
	options: XMLFormatterOptions = formatterOptions
) {
	const formattedXml = xmlFormatter(xmlString, options);

	return formattedXml;
}
