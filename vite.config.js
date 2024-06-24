import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // plugins: [laravel(["resources/js/app.jsx"]), react()],
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
    ],
});
