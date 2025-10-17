import { format } from "prettier";
import chalk from 'chalk'

// $lib/utils/logger.js
function formatMessage(prefix, ...args) {
	const timestamp = new Date().toLocaleTimeString();

	return [
		`%c${timestamp} ${prefix}`,
		`color: green; font-weight: bold;`,
		...args
	];
}

export function log(...args) {
	const prefix = chalk.blue('[LOG]');
	console.log(...formatMessage(prefix, ...args));
}

export function info(...args) {
	const prefix = chalk.green('[INFO]');
	console.info(...formatMessage(prefix, ...args));
}

export function warn(...args) {
	const prefix = chalk.bgYellow('[WARN]');
	console.warn(...formatMessage(prefix, ...args));
}

export function error(...args) {
	const prefix = chalk.bgRed('[ERROR]');
	console.error(...formatMessage(prefix, ...args));
}

export function debug(...args) {
	const prefix = chalk.yellow('[DEBUG]');
	console.debug(...formatMessage(prefix, ...args));
}
