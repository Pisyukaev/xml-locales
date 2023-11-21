import type {
	SortDirection,
	SortOptions,
	StringElement
} from '../utils/types.js';

export function sortBy(strElements: StringElement[], direction: SortDirection) {
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

export function sort({ sortDirection, jsonXml }: SortOptions) {
	const {
		resources: { string }
	} = jsonXml;

	const sortedString = sortBy(string, sortDirection);
	jsonXml.resources.string = sortedString;

	return jsonXml;
}
