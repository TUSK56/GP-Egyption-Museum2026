const TTL_MS = 60 * 60 * 1000; // 1 hour in memory
const STORAGE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in localStorage
const STORAGE_PREFIX = "gem_cache:";

const store = new Map();

function readStorage(key) {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.expires || Date.now() > parsed.expires) {
            window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
            return null;
        }
        return parsed.data ?? null;
    } catch {
        return null;
    }
}

function writeStorage(key, data) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(
            `${STORAGE_PREFIX}${key}`,
            JSON.stringify({ data, expires: Date.now() + STORAGE_TTL_MS }),
        );
    } catch {
        // Quota or private mode — memory cache still helps this session.
    }
}

export function getCachedMuseum(key) {
    const entry = store.get(key);
    if (entry && Date.now() <= entry.expires) {
        return entry.data;
    }
    if (entry) store.delete(key);

    const fromStorage = readStorage(key);
    if (fromStorage) {
        store.set(key, { data: fromStorage, expires: Date.now() + TTL_MS });
        return fromStorage;
    }
    return null;
}

export function setCachedMuseum(key, data, ttlMs = TTL_MS) {
    store.set(key, { data, expires: Date.now() + ttlMs });
    writeStorage(key, data);
}

export async function cachedMuseumRequest(key, loader) {
    const hit = getCachedMuseum(key);
    if (hit) {
        // Refresh in background so the next visit is instant too.
        void loader()
            .then((fresh) => setCachedMuseum(key, fresh))
            .catch(() => {});
        return hit;
    }
    const data = await loader();
    setCachedMuseum(key, data);
    return data;
}

export function prefetchMuseumData(keys, loaderByKey) {
    if (typeof window === "undefined") return;
    for (const key of keys) {
        if (getCachedMuseum(key)) continue;
        void loaderByKey(key)
            .then((data) => setCachedMuseum(key, data))
            .catch(() => {});
    }
}
