import type { ArgumentsCamelCase, Argv } from 'yargs';

import { newLocale } from '../modifiers/newLocale';

export const command = 'new';
export const description = 'Create new localization file from master file';

export function builder(yargs: Argv) {
	return yargs
		.option('name', {
			alias: 'n',
			desc: 'Name of new localization file',
			demandOption: true,
			type: 'string'
		})
		.option('master', {
			alias: 'm',
			desc: 'Master localization file',
			demandOption: true,
			type: 'string'
		})
		.option('directory', {
			alias: 'dir',
			desc: 'Directory of localization files',
			type: 'string',
			default: 'mock'
		})
		.usage(`\nExample:\n $0 ${command} -n strings-kz.xml -m strings.xml`);
}

export async function handler({
	name,
	master,
	directory
}: ArgumentsCamelCase<{
	name: string;
	master: string;
	directory: string;
}>) {
	newLocale({ name, master, directory });
}
