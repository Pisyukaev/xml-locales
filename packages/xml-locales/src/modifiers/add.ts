import { checkKeyExist, replaceValue } from '../utils/helpers.js';
import { sort } from './sort.js';
import type { AddOptions } from '../utils/types.js';

export function add({ key, value, sortDirection, jsonXml }: AddOptions) {
	const {
		resources: { string }
	} = jsonXml;

	const hasKey = checkKeyExist(key, string);

	if (hasKey) {
		const replacedStrings = replaceValue(string, key, value);

		jsonXml.resources.string = replacedStrings;
	}

	if (!hasKey) {
		jsonXml.resources.string.push({
			key_name: key,
			'#text': value
		});
	}

	if (sortDirection) {
		sort({ sortDirection, jsonXml });
	}

	return jsonXml;
}
