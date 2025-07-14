// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your project structure
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                primary: "var(--primary)",
                'primary-foreground': "var(--primary-foreground)",
                secondary: "var(--secondary)",
                'secondary-foreground': "var(--secondary-foreground)",
                muted: "var(--muted)",
                'muted-foreground': "var(--muted-foreground)",
                accent: "var(--accent)",
                'accent-foreground': "var(--accent-foreground)",
                destructive: "var(--destructive)",
                card: "var(--card)",
                'card-foreground': "var(--card-foreground)",
                popover: "var(--popover)",
                'popover-foreground': "var(--popover-foreground)",
                sidebar: "var(--sidebar)",
                'sidebar-foreground': "var(--sidebar-foreground)",
                'sidebar-primary': "var(--sidebar-primary)",
                'sidebar-primary-foreground': "var(--sidebar-primary-foreground)",
                'sidebar-accent': "var(--sidebar-accent)",
                'sidebar-accent-foreground': "var(--sidebar-accent-foreground)",
                'sidebar-border': "var(--sidebar-border)",
                'sidebar-ring': "var(--sidebar-ring)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
                xl: "var(--radius-xl)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                mono: ["var(--font-mono)", ...fontFamily.mono],
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};
