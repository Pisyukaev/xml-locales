import { checkKeyExist, replaceValue } from '../utils/files';
import { hasConflict } from '../utils/queries';

export function add(options: {
	key: string;
	value: string;
	directory: string;
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
		const { key, value } = options;
		const {
			resources: { string }
		} = jsonXml;

		const hasKey = checkKeyExist(key, string);

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
			const replacedStrings = replaceValue(string, key, value);

			jsonXml.resources.string = replacedStrings;
		}

		if (!hasKey) {
			jsonXml.resources.string.push({
				key_name: key,
				'#text': value
			});
		}

		return jsonXml;
	};
}
