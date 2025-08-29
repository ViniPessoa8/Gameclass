export function load({ data, url }) {

	return {
		...data,
		voltarPara: url.pathname
	};
}
