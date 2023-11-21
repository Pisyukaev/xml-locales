import { checkKeyValueExist } from '../utils/helpers.js';
import { sort } from './sort.js';
import type { DeleteOptions } from '../utils/types.js';

export function del({ keyValue, sort: sortDirection, jsonXml }: DeleteOptions) {
	const {
		resources: { string }
	} = jsonXml;

	const hasKeyValue = checkKeyValueExist(keyValue, string);

	if (hasKeyValue) {
		const filteredStrings = string.filter(
			(element) =>
				element['#text'] !== keyValue && element.key_name !== keyValue
		);

		jsonXml.resources.string = filteredStrings;
	}

	if (sortDirection) {
		sort({ sortDirection, jsonXml });
	}

	return jsonXml;
}
