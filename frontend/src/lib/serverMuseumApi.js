import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "./apiConfig";

const REVALIDATE_SECONDS = 120;

function serverApiBase() {
    return normalizeApiBaseUrl(
        process.env.NEXT_INTERNAL_API_BASE_URL ||
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            DEFAULT_API_BASE_URL,
    );
}

export async function fetchMuseumServer(path) {
    const base = serverApiBase();
    const res = await fetch(`${base}${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
        throw new Error(`Museum API ${path} failed: ${res.status}`);
    }
    return res.json();
}

export async function getArtifactsServer() {
    return fetchMuseumServer("/api/artifacts");
}

export async function getCategoriesServer() {
    return fetchMuseumServer("/api/categories");
}

export async function getArtifactByIdServer(id) {
    return fetchMuseumServer(`/api/artifacts/${id}`);
}
