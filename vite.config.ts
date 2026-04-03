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
				start_url: '/timekit/',
				scope: '/timekit/',
				description: 'Work and Sleep Time Calculator',
				background_color: '#f4f5f7', // Match your --color-main-bg
				display: 'standalone',
				icons: [
					{
						src: 'icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icon-512.png',
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
