import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

type ThemeStorageContextType = {
    theme: ColorSchemeName;
    toggleTheme: (theme: ColorSchemeName) => Promise<void>;
};

const ThemeStorageContext = createContext({} as ThemeStorageContextType);

export function ThemeStorageProvider({ children }: React.PropsWithChildren) {
    const [theme, setTheme] = useState<ColorSchemeName>();

    const storedTheme = useAsyncStorage('@theme');

    useEffect(() => {
        setTheme(Appearance.getColorScheme());
    }, []);

    const toggleTheme = async (theme: ColorSchemeName) => {
        setTheme(theme);

        if (theme) {
            storedTheme.setItem(theme);
        }
    };

    return (
        <ThemeStorageContext.Provider value={{
            theme,
            toggleTheme
        }}>
            {children}
        </ThemeStorageContext.Provider>
    );
}

export function useThemeStorage() {
    return useContext(ThemeStorageContext);
}