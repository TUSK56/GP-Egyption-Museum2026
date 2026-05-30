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

/** Smaller payload so localStorage survives reload (full artifact JSON can exceed quota). */
function slimAdminArtifactsResponse(response) {
    const data = Array.isArray(response?.data) ? response.data : [];
    return {
        success: response?.success ?? true,
        data: data.map((a) => ({
            id: a.id,
            slug: a.slug,
            eraId: a.eraId,
            categoryId: a.categoryId,
            materialId: a.materialId,
            modelFileId: a.modelFileId,
            createdAt: a.createdAt,
            era: a.era ? { id: a.era.id, name: a.era.name } : null,
            category: a.category ? { id: a.category.id, name: a.category.name } : null,
            material: a.material ? { id: a.material.id, name: a.material.name } : null,
            discoveryLocation: a.discoveryLocation
                ? { id: a.discoveryLocation.id, name: a.discoveryLocation.name }
                : null,
            thumbnailFile: a.thumbnailFile?.url ? { url: a.thumbnailFile.url } : null,
            modelFile: a.modelFile?.url
                ? { id: a.modelFile.id, url: a.modelFile.url }
                : null,
            translations: Array.isArray(a.translations)
                ? a.translations.slice(0, 1).map((t) => ({
                      languageCode: t.languageCode,
                      name: t.name,
                      description: t.description,
                      historicalStory: t.historicalStory,
                  }))
                : [],
        })),
    };
}

function normalizeForStorage(key, data) {
    const baseKey = String(key).split("?")[0];
    if (
        (baseKey === "/api/artifacts" || baseKey.startsWith("admin:")) &&
        data &&
        Array.isArray(data.data)
    ) {
        return slimAdminArtifactsResponse(data);
    }
    return data;
}

/** Read cached API payload synchronously (for useState initializers). */
export function getCachedMuseumList(key) {
    const hit = getCachedMuseum(key);
    return Array.isArray(hit?.data) ? hit.data : [];
}

export function hasCachedMuseum(key) {
    return getCachedMuseumList(key).length > 0 || getCachedMuseum(key) != null;
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
    const normalized = normalizeForStorage(key, data);
    store.set(key, { data: normalized, expires: Date.now() + ttlMs });
    writeStorage(key, normalized);
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
