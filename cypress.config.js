import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		experimentalStudio: true,
	},
	scrollBehavior: "center"
});
