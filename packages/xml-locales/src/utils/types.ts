import { XmlJsonData } from './xml.js';

export interface XmlNode {
	key_name: string;
	'#text': string;
}

export type XmlDataTypes = string | Buffer | XmlJsonData;

export interface XmlJson {
	resources: {
		string: XmlNode[];
	};
}

export interface AddOptions {
	keys: string[];
	values: string[];
}

export interface UpdateOptions {
	oldValues: string[];
	newValues: string[];
}

export type SortDirection = 'asc' | 'desc';
export interface SortOptions {
	sortDirection: SortDirection;
}
