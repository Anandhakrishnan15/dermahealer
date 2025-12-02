"use client";

import { createContext, useContext, useState } from "react";

const StatsContext = createContext();

export function StatsProvider({ children }) {
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [todayAppointments, setTodayAppointments] = useState(0);
    const [totalBlog, setTotalBlog] = useState(0);
    const [totalMenbers, setTotalMenbers] = useState(0);


    return (
        <StatsContext.Provider value={{
            totalAppointments,
            setTotalAppointments,
            todayAppointments,
            setTodayAppointments, totalBlog, setTotalBlog,totalMenbers, setTotalMenbers
        }}>
            {children}
        </StatsContext.Provider>
    );
}

export const useStats = () => useContext(StatsContext);
