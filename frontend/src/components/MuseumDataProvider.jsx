"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { setCachedMuseum } from "../lib/museumCache";

const MuseumDataContext = createContext({
    artifacts: null,
    categories: null,
});

export function MuseumDataProvider({ artifacts, categories, children }) {
    useEffect(() => {
        if (artifacts) setCachedMuseum("/api/artifacts", artifacts);
        if (categories) setCachedMuseum("/api/categories", categories);
    }, [artifacts, categories]);

    const value = useMemo(
        () => ({ artifacts, categories }),
        [artifacts, categories],
    );

    return (
        <MuseumDataContext.Provider value={value}>
            {children}
        </MuseumDataContext.Provider>
    );
}

export function useMuseumData() {
    return useContext(MuseumDataContext);
}
