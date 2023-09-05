import { checkKeyValueExist } from '../utils/files';
import { deleteAnswer } from '../utils/queries';

export function del(options: { keyValue: string }) {
	let DELETE_ALL = false;
	let NEED_DELETE = false;

	return async function delString({
		filePath,
		jsonXml
	}: {
		filePath: string;
		jsonXml: XmlJson;
	}) {
		const { keyValue } = options;
		const {
			resources: { string }
		} = jsonXml;

		const hasKeyValue = checkKeyValueExist(keyValue, string);

		if (!DELETE_ALL && hasKeyValue) {
			const answer = await deleteAnswer(filePath);

			switch (answer) {
				case 'yes': {
					NEED_DELETE = true;
					break;
				}
				case 'all': {
					DELETE_ALL = true;
					break;
				}
				case 'skip': {
					NEED_DELETE = false;
					break;
				}

				default:
					console.log('Cancelled');
					return;
			}
		}

		const needDelete = DELETE_ALL || NEED_DELETE;

		if (needDelete) {
			const filteredStrings = string.filter(
				(element) =>
					element['#text'] !== keyValue && element.key_name !== keyValue
			);

			jsonXml.resources.string = filteredStrings;
		}

		return jsonXml;
	};
}
