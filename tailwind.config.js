// See Tailwind config guide for reference: https://tailwindcss.com/docs/configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"webriq-blue": "#296eff",
				"webriq-lightblue": "#d5e3ff",
				"webriq-darkblue": "#0045d8",
				"webriq-babyblue": "#3576ff",
			},
		},
	},
};
