import React from 'react';
import { useTheme } from '../appContext/AppThemeContext';

export const  AppThemeChanger = (props) => {
    const {theme, toggleTheme} = useTheme();
    return (
        <div>
            <button onClick={toggleTheme} className=""> Change to {theme==="light" ? "Dark Mode" : "Light Mode"}</button>
        </div>
    );
}
