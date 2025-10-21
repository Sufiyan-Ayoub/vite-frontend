import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 4000,
		proxy: {
			'/__': {
				target: 'http://192.168.0.106:8891',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/__/, '@')
				}
			}
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})