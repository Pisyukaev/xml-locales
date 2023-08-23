interface StringElement {
	key_name: string;
	'#text': string;
}

interface XmlJson {
	resources: {
		string: StringElement[];
	};
}
