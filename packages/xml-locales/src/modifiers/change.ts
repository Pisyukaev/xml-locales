import { checkKeyValueExist, replace } from '../utils/helpers.js';
import { sort } from './sort.js';
import type { ChangeOptions } from '../utils/types.js';

export function change({
	oldKey,
	newKey,
	sortDirection,
	jsonXml
}: ChangeOptions) {
	const {
		resources: { string }
	} = jsonXml;

	const hasKey = checkKeyValueExist(oldKey, string);

	if (hasKey) {
		const replacedStrings = replace(string, oldKey, newKey);

		jsonXml.resources.string = replacedStrings;
	}

	if (sortDirection) {
		sort({ sortDirection, jsonXml });
	}

	return jsonXml;
}
