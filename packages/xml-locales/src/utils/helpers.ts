import type { StringElement } from './types.js';

export function checkKeyExist(key: string, strElements: StringElement[]) {
	return strElements.find(
		({ key_name }: { key_name: string }) => key_name === key
	);
}

export function checkKeyValueExist(
	keyValue: string,
	strElement: StringElement[]
) {
	return strElement.find(
		(element) => element['#text'] === keyValue || element.key_name === keyValue
	);
}

export function replaceValue(
	strElements: StringElement[],
	key: string,
	newValue: string
) {
	const replacedStrings = strElements.map((element) => {
		if (element.key_name === key) {
			return {
				...element,
				'#text': newValue
			};
		}

		return element;
	});

	return replacedStrings;
}

export function replace(
	strElements: StringElement[],
	oldKeyValue: string,
	newKeyValue: string
) {
	const replaced = strElements.map((element) => {
		if (element.key_name === oldKeyValue) {
			return {
				...element,
				key_name: newKeyValue
			};
		}

		if (element['#text'] === oldKeyValue) {
			return {
				...element,
				'#text': newKeyValue
			};
		}

		return element;
	});

	return replaced;
}
