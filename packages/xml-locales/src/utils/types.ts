export interface StringElement {
	key_name: string;
	'#text': string;
}

export interface XmlJson {
	resources: {
		string: StringElement[];
	};
}
