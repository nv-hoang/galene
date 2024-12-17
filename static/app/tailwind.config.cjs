/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.html"],
    theme: {
        fontFamily: {
            body: ["sans-serif"],
        },
        colors: {
            black: '#000000',
            white: "#ffffff",
            transparent: 'transparent',
            primary: {
                500: '#065CBD',
                600: '#0c549c',
            },
            danger: {
                500: '#D23325',
                600: '#b72a1e',
            },
            dark: {
                100: '#f5f6f6',
                700: '#393e40',
                800: '#27282A',
                900: '#161819'
            },
        },
    },
    plugins: [
        function ({ addBase, theme }) {
            function extractColorVars(colorObj, colorGroup = '') {
                return Object.keys(colorObj).reduce((vars, colorKey) => {
                    const value = colorObj[colorKey];

                    const newVars =
                        typeof value === 'string'
                            ? { [`--tw${colorGroup}-${colorKey}`]: value }
                            : extractColorVars(value, `-${colorKey}`);

                    return { ...vars, ...newVars };
                }, {});
            }

            addBase({
                ':root': extractColorVars(theme('colors')),
            });
        },
    ],
};
