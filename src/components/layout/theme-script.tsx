"use client";

// Key must stay in sync with THEME_KEY in src/components/layout/theme-toggle.tsx.
const themeInitScript = `(function(){try{var t=localStorage.getItem("impactpulse-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export function ThemeScript() {
  // Server e render hoy (first paint er age theme set kore).
  // Client e null return kore, tai React 19 er script warning ashe na.
  if (typeof window !== "undefined") return null;

  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}