import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		exclude: [
			"**/*.stories.*", // Exclude all Storybook story files
			"**/storybook-static/**", // Exclude Storybook's build output
			"**/node_modules/**"
		],
		coverage: {
			include: ["src/**", "lib/**"]
		},
		clearMocks: true,
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
		retry: 2
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
			lib: resolve(__dirname, "./lib")
		}
	}
})
