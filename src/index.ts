#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { commands } from './commands';

yargs(hideBin(process.argv))
	.scriptName('xml-locales')
	.usage('$0 <cmd> [args]')
	// @ts-ignore
	.command(commands)
	.help().argv;
