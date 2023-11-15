import { checkKeyValueExist } from '../utils/files';
import { deleteAnswer } from '../utils/queries';
import { sort } from './sort';

export function del(options: {
	keyValue: string;
	sort?: 'asc' | 'desc';
	accept: boolean;
}) {
	let DELETE_ALL = false;
	let NEED_DELETE = false;

	return async function delString({
		filePath,
		jsonXml
	}: {
		filePath: string;
		jsonXml: XmlJson;
	}) {
		const { keyValue, sort: sortDirection, accept } = options;
		const {
			resources: { string }
		} = jsonXml;

		const hasKeyValue = checkKeyValueExist(keyValue, string);

		if (!accept && !DELETE_ALL && hasKeyValue) {
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

		if (sortDirection) {
			sort({ direction: sortDirection })({ jsonXml });
		}

		return jsonXml;
	};
}
