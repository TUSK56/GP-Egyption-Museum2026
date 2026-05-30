"use client";

import { useCallback, useEffect, useState } from "react";
import {
    cachedMuseumRequest,
    getCachedMuseumList,
    hasCachedMuseum,
    setCachedMuseum,
} from "./museumCache";

/**
 * Admin list hook: show cached data instantly on reload, refresh in background.
 */
export function useAdminCachedList(cacheKey, loader) {
    const [items, setItems] = useState(() => getCachedMuseumList(cacheKey));
    const [loading, setLoading] = useState(
        () => typeof window === "undefined" || !hasCachedMuseum(cacheKey),
    );
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const reload = useCallback(
        async ({ forceNetwork = false } = {}) => {
            const hasCache = hasCachedMuseum(cacheKey);
            if (!hasCache || forceNetwork) {
                if (!hasCache) setLoading(true);
            } else {
                setRefreshing(true);
            }
            setError("");
            try {
                let response;
                if (hasCache && !forceNetwork) {
                    response = await cachedMuseumRequest(cacheKey, loader);
                } else {
                    response = await loader();
                    setCachedMuseum(cacheKey, response);
                }
                setItems(Array.isArray(response?.data) ? response.data : []);
            } catch (e) {
                setError(e?.message || "Failed to load data.");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [cacheKey, loader],
    );

    useEffect(() => {
        void reload();
    }, [reload]);

    return { items, setItems, loading, refreshing, error, reload };
}
