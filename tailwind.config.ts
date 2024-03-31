import type { Config } from "tailwindcss";
const {
   default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   darkMode: "class",
   theme: {
      extend: {
         animation: {
            aurora: "aurora 60s linear infinite",
         },
         keyframes: {
            aurora: {
               from: {
                  backgroundPosition: "50% 50%, 50% 50%",
               },
               to: {
                  backgroundPosition: "350% 50%, 350% 50%",
               },
            },
         },
      },
   },
   plugins: [addVariablesForColors],
};
export default config;

function addVariablesForColors({ addBase, theme }: any) {
   let allColors = flattenColorPalette(theme("colors"));
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   );

   addBase({
      ":root": newVars,
   });
}
