import { checkKeyExist, replaceValue } from '../utils/files.js';
import { hasConflict } from '../utils/queries.js';
import { sort } from './sort.js';

export function add(options: {
	key: string;
	value: string;
	directory: string;
	sort?: 'asc' | 'desc';
	accept: boolean;
}) {
	let REPLACE_ALL = false;
	let NEED_REPLACE = false;

	return async function ({
		filePath,
		jsonXml
	}: {
		filePath: string;
		jsonXml: XmlJson;
	}) {
		const { key, value, sort: sortDirection, accept } = options;

		const {
			resources: { string }
		} = jsonXml;

		const hasKey = checkKeyExist(key, string);

		if (!accept && !REPLACE_ALL && hasKey) {
			const answer = await hasConflict(filePath);

			switch (answer) {
				case 'yes': {
					NEED_REPLACE = true;
					break;
				}
				case 'all': {
					REPLACE_ALL = true;
					break;
				}
				case 'skip': {
					NEED_REPLACE = false;
					break;
				}

				default:
					console.log('Cancelled');
					return;
			}
		}

		const needReplace = REPLACE_ALL || NEED_REPLACE;

		if (needReplace) {
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
			sort({ direction: sortDirection })({ jsonXml });
		}

		return jsonXml;
	};
}
