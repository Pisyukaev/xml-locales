import { sortBy } from '../utils/files';

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
