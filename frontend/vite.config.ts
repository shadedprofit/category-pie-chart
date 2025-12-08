/// <reference types="vite/client" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		svgr(),
		libInjectCss(),
		tailwindcss(),
		dts({ include: ["lib"] })
	],
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
			lib: resolve(__dirname, "./lib")
		}
	},
	define: {
		_global: {}
	},
	build: {
		copyPublicDir: false,
		// Since only CategoryPieChart is meant to be the reusable component,
		// we will only build whatever is exported from the `lib` folder.
		// In this case, that's only the CategoryPieChart and it's associated types.
		lib: {
			entry: resolve(__dirname, "./lib/index.ts"),
			name: "CategoryPieChart",
			fileName: format => `category-pie-chart.${format}.js`,
			formats: ["es", "cjs"]
		},
		rolldownOptions: {
			output: [
				{
					globals: {
						react: "React",
						"react-dom": "React-dom",
						"react/jsx-runtime": "react/jsx-runtime"
					}
				}
			],
			external: [
				"react",
				"react-dom",
				"recharts",
				"react/jsx-runtime",
				"**/*.stories.ts",
				"**/*.stories.tsx",
				"**/*.stories.js",
				"**/*.stories.jsx",
				"./storybook/**"
			]
		}
	}
})
