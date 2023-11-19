import * as fs from 'fs';

export function newLocale(options: { name: string; master: string }) {
	const { name, master } = options;

	fs.copyFile(master, name, (err) => {
		if (err) {
			console.error(err);

			return;
		}
		console.log(`${master} was copied to ${name}`);
	});
}
