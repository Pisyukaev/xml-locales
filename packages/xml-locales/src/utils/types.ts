export interface StringElement {
	key_name: string;
	'#text': string;
}

export interface XmlJson {
	resources: {
		string: StringElement[];
	};
}

export interface RawXmlJson {
	resources: {
		string: StringElement | StringElement[];
	};
}

export type SortDirection = 'asc' | 'desc';

export interface BaseOptions {
	jsonXml: XmlJson;
	sortDirection?: SortDirection;
}

export interface AddOptions extends BaseOptions {
	key: string;
	value: string;
}

export interface DeleteOptions extends BaseOptions {
	keyValue: string;
	sort?: SortDirection;
}

export interface ChangeOptions extends BaseOptions {
	oldKey: string;
	newKey: string;
}

export interface SortOptions extends BaseOptions {
	sortDirection: SortDirection;
}

export type ModifierOptions =
	| AddOptions
	| DeleteOptions
	| ChangeOptions
	| SortOptions;
