export function sortBy(
	strElements: StringElement[],
	direction: 'asc' | 'desc'
) {
	const { compare } = new Intl.Collator();

	const compareFn = (a: StringElement, b: StringElement) => {
		const isAsc = direction === 'asc';
		const first = isAsc ? a : b;
		const second = isAsc ? b : a;

		return compare(first.key_name.toLowerCase(), second.key_name.toLowerCase());
	};

	const sortedElements = strElements.sort(compareFn);

	return sortedElements;
}

export function sort({ direction }: { direction: 'asc' | 'desc' }) {
	return function ({ jsonXml }: { jsonXml: XmlJson }) {
		const {
			resources: { string }
		} = jsonXml;

		const sortedString = sortBy(string, direction);
		jsonXml.resources.string = sortedString;

		return jsonXml;
	};
}
