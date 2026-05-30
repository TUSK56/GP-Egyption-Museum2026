"use client";

import { useEffect } from "react";
import { apiRequest } from "../lib/api";
import { prefetchMuseumData } from "../lib/museumCache";
import { DEFAULT_API_BASE_URL, normalizeApiBaseUrl } from "../lib/apiConfig";

export default function MuseumPrefetch() {
    useEffect(() => {
        prefetchMuseumData(["/api/artifacts", "/api/categories"], (key) =>
            apiRequest(key),
        );
    }, []);

    return null;
}

export function museumApiOrigin() {
    return normalizeApiBaseUrl(
        process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL,
    );
}
