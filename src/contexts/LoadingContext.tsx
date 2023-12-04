import React, { createContext, useContext } from 'react';

type LoadingContextType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
};

const LoadingContext = createContext({} as LoadingContextType);

export function LoadingProvider({ children }: React.PropsWithChildren<{}>) {
    const [loading, setLoading] = React.useState<boolean>(false);

    return (
        <LoadingContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}