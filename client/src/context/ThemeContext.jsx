import React, { createContext, useState } from 'react'

// create a context
export const ThemeContext = createContext();

// create a provider component
export default function ThemeProvider({ children }) {
    // create a state to hold the theme
    const [theme, setTheme] = useState('light');

    // function to toggle the theme
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    /* In the provided code snippet, `const value = { theme, toggleTheme }` is creating an object named
    `value` with two properties: `theme` and `toggleTheme`. */
    const value = { theme, toggleTheme }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
