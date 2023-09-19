import type { Config } from 'tailwindcss';

const config: Config = {
   darkMode: 'class',
   content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         colors: {
            'dark-100': '#151515',
            'dark-200': '#090909',
            'dark-300': '#161616',
            'dark-50': '#191919',
            'dark-150': '#212121',
         },
      },
   },
   plugins: [],
};
export default config;
