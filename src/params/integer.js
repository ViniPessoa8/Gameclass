/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
	// Retorna `true` se o parâmetro for uma string contendo apenas dígitos
	// e `false` caso contrário.
	return /^\d+$/.test(param);
}
