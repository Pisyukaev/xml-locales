import { XmlJsonData } from '../utils/xml.js';
import type { SortDirection } from '../utils/types.js';

export function sortXmlNodes(
	xmlData: XmlJsonData,
	direction: SortDirection
): XmlJsonData {
	const collator = new Intl.Collator();
	const sortedNodes = xmlData.resources.string.sort((a, b) => {
		const isAsc = direction === 'asc';
		const first = isAsc ? a : b;
		const second = isAsc ? b : a;

		return collator.compare(
			first.key_name.toLowerCase(),
			second.key_name.toLowerCase()
		);
	});

	return new XmlJsonData({ resources: { string: sortedNodes } });
}
