import {  checkKeyValueExist, replace } from '../utils/files';
import { hasConflict } from '../utils/queries';
import { sort } from './sort';

export function change(options: {
	oldKey: string;
	newKey: string;
	sort?: 'asc' | 'desc';
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
		const { oldKey, newKey, sort: sortDirection } = options;
		const {
			resources: { string }
		} = jsonXml;

		const hasKey = checkKeyValueExist(oldKey, string);

		if (!REPLACE_ALL && hasKey) {
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
			const replacedStrings = replace(string, oldKey, newKey);

			jsonXml.resources.string = replacedStrings;
		}

		if (sortDirection) {
			sort({ direction: sortDirection })({ jsonXml });
		}

		return jsonXml;
	};
}
