// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // CRUCIAL: Tell Tailwind where your files are located
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all files in src and its subfolders
  ],
  theme: {
    extend: {
		fontFamily:{
			'signature':['"Momo Signature"', 'cursive'],
			'trust' :['"Momo Trust Display"', 'cursive'],'slab' :['"Roboto Slab"', 'cursive'],
		}
	},
  },
  plugins: [],
}

