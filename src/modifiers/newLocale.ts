import * as fs from 'fs';

export function newLocale(options: {
	name: string;
	master: string;
	directory: string;
}) {
	const { name, master, directory } = options;

	fs.copyFile(`${directory}/${master}`, `${directory}/${name}`, (err) => {
		if (err) {
			console.error(err);

			return;
		}
		console.log(`${master} was copied to ${directory}/${name}`);
	});
}
