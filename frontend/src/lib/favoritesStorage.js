import { getCurrentUser } from "./authStorage";

function resolveScopeKey(baseKey) {
    if (typeof window === "undefined") return baseKey;
    const user = getCurrentUser();
    const userKey = user?.userId || user?.email || "guest";
    return `${baseKey}_${userKey}`;
}

export function getScopedFavorites(baseKey) {
    if (typeof window === "undefined") return [];
    const key = resolveScopeKey(baseKey);
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function setScopedFavorites(baseKey, items) {
    if (typeof window === "undefined") return;
    const key = resolveScopeKey(baseKey);
    localStorage.setItem(key, JSON.stringify(items));
}
