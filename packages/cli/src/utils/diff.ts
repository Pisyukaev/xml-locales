import { createPatch } from 'diff';
import { XmlLocales } from 'xml-locales';

export class Diff {
	/** @internal */
	private filePath: string;

	/** @internal */
	private actual: string;

	constructor(filePath: string, xmlLocales: XmlLocales) {
		this.filePath = filePath;
		this.actual = xmlLocales.toXML();
	}

	print(expected: string): void {
		const patch = createPatch('string', this.actual, expected);
		const lines = patch.split('\n').slice(4).map(rework).filter(notNull);
		console.log(
			`${this.filePath}: ${
				lines.length ? `\n${lines.join('\n')}` : 'no changes'
			}\n`
		);
	}
}

function rework(line: string): string | null {
	switch (line.charAt(0)) {
		case '+':
			return colorize('added', line);
		case '-':
			return colorize('removed', line);
		case ' ':
			return line;
		case '@':
			return null;
		case '\\':
			return null;
		default:
			return null;
	}
}

function notNull<T extends string>(line: string | null): line is T {
	return line !== null;
}

const colors = {
	added: 32,
	removed: 31
} as const;

function colorize(color: keyof typeof colors, string: string): string {
	return `\u001b[${colors[color]}m${string}\u001b[0m`;
}
