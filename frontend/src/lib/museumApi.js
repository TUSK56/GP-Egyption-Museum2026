import { apiRequest } from "./api";

export async function getArtifacts() {
    return apiRequest("/api/artifacts");
}

export async function getArtifactById(id) {
    return apiRequest(`/api/artifacts/${id}`);
}

export async function getCategories() {
    return apiRequest("/api/categories");
}
