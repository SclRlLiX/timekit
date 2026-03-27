import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			injectRegister: 'auto',
			// This is crucial for GitHub Pages
			base: '/timekit/',
			manifest: {
				name: 'Timekit',
				short_name: 'Timekit',
				description: 'Work and Sleep Time Calculator',
				theme_color: '#2563eb', // Match your --color-accent
				background_color: '#16171d', // Match your --color-main-bg
				display: 'standalone',
				icons: [
					{
						src: 'timekit-icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'timekit-icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
				navigateFallback: null,
				modifyURLPrefix: {
					'': '/timekit/'
				}
			}
		})
	]
});
