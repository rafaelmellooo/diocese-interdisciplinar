import React, { createContext, useContext } from 'react';
import * as Location from 'expo-location';

type LocationContextType = {
    location: Location.LocationObject;
};

const LocationContext = createContext({} as LocationContextType);

type LocationProviderProps = {
    location: Location.LocationObject;
};
export function LocationProvider({ children, location }: React.PropsWithChildren<LocationProviderProps>) {
    return (
        <LocationContext.Provider value={{
            location: location
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    return useContext(LocationContext);
}