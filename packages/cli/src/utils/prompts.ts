import { expand } from '@inquirer/prompts';

export async function hasConflict(fileName: string) {
	return await expand({
		message: `Conflict on ${fileName}`,
		default: 'y',
		choices: [
			{
				key: 'y',
				name: 'Overwrite',
				value: 'yes'
			},
			{
				key: 'a',
				name: 'Overwrite this one and all next',
				value: 'all'
			},
			{
				key: 's',
				name: 'Skip',
				value: 'skip'
			}
		]
	});
}

export async function deleteAnswer(fileName: string) {
	return await expand({
		message: `Delete on ${fileName}?`,
		default: 'y',
		choices: [
			{
				key: 'y',
				name: 'Delete',
				value: 'yes'
			},
			{
				key: 'a',
				name: 'Delete this one and all next',
				value: 'all'
			},
			{
				key: 's',
				name: 'Skip',
				value: 'skip'
			}
		]
	});
}
