import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
import { ColorSchemeName } from 'react-native';

type ThemeStorageContextType = {
    theme: ColorSchemeName;
    toggleTheme: (theme: ColorSchemeName) => Promise<void>;
};

type ThemeStorageProviderProps = {
    theme: ColorSchemeName;
};
const ThemeStorageContext = createContext({} as ThemeStorageContextType);

export function ThemeStorageProvider(props: React.PropsWithChildren<ThemeStorageProviderProps>) {
    const [theme, setTheme] = useState<ColorSchemeName>(props.theme);

    const storedTheme = useAsyncStorage('@theme');

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
            {props.children}
        </ThemeStorageContext.Provider>
    );
}

export function useThemeStorage() {
    return useContext(ThemeStorageContext);
}