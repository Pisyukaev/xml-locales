import type { ArgumentsCamelCase, Argv } from 'yargs';

import { change } from '../modifiers/change';
import { modificationFile } from '../utils/files';

export const command = 'change';
export const description = 'Change key or value of localization string';

export function builder(yargs: Argv) {
	return yargs
		.option('oldkey', {
			desc: 'Old key or value of changing string',
			demandOption: true,
			type: 'string'
		})
		.option('newkey', {
			desc: 'New key or value of changing string',
			demandOption: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.option('sort', {
			alias: 's',
			desc: 'Sorted keys of strings by asc or desc',
			type: 'string'
		});
  }


export async function handler({
	oldkey: oldKeyValue,
	newkey: newKeyValue,
	directory,
	sort
}: ArgumentsCamelCase<{
	oldkey: string;
	newkey: string;
	directory: string;
	sort?: 'asc' | 'desc';
}>) {

	console.log(oldKeyValue, newKeyValue)

	modificationFile(change({ 
		oldKey: oldKeyValue, 
		newKey: newKeyValue, 
		sort }), 
		directory);
}
