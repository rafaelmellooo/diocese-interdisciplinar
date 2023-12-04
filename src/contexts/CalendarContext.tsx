import React, { createContext, useContext } from 'react';

type CalendarContextType = {
    calendar: string;
};

const CalendarContext = createContext({} as CalendarContextType);

type CalendarProviderProps = {
    calendar: string;
};
export function CalendarProvider({ children, calendar }: React.PropsWithChildren<CalendarProviderProps>) {
    return (
        <CalendarContext.Provider value={{
            calendar: calendar
        }}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    return useContext(CalendarContext);
}