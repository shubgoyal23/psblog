import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function ThemeSwitcher() {
   const [mode, setMode] = useState("");

   function themeswitch(theme: string) {
      if (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
         setMode("dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
         setMode("light");
      }
   }

   useEffect(() => {
      let theme = localStorage.getItem("theme");
      if (theme) {
         themeswitch(theme);
      } else {
         themeswitch("system");
      }
   }, []);

   const handleThemeChange = () => {
      const newMode = mode === "dark" ? "light" : "dark";
      themeswitch(newMode);
      setMode(newMode);
   };

   return (
      <div className="lg:fixed right-3 top-5 text-2xl text-gray-500 dark:text-gray-300">
         <button onClick={handleThemeChange}>
            {mode === "dark" ? (
               <FontAwesomeIcon icon={faSun} className="" />
            ) : (
               <FontAwesomeIcon icon={faMoon} className="" />
            )}
         </button>
      </div>
   );
}

export default ThemeSwitcher;
