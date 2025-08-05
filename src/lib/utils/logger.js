import { format } from "prettier";

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
	const prefix = '[log]';
	console.log(...formatMessage(prefix, ...args));
}

export function info(...args) {
	const prefix = '[INFO]';
	console.info(...formatMessage(prefix, ...args));
}

export function warn(...args) {
	const prefix = '[WARN]';
	console.warn(...formatMessage(prefix, ...args));
}

export function error(...args) {
	const prefix = '[ERROR]';
	console.error(...formatMessage(prefix, ...args));
}

export function debug(...args) {
	const prefix = '[DEBUG]';
	console.debug(...formatMessage(prefix, ...args));
}
