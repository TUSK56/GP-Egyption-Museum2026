import { apiRequest } from "./api";

export async function registerUser(payload) {
    return apiRequest("/api/auth/register", {
        method: "POST",
        body: payload,
    });
}

export async function loginUser(payload) {
    return apiRequest("/api/auth/login", {
        method: "POST",
        body: payload,
    });
}

export async function sendOtp(payload) {
    return apiRequest("/api/auth/send-otp", {
        method: "POST",
        body: payload,
    });
}

export async function verifyOtp(payload) {
    return apiRequest("/api/auth/verify-otp", {
        method: "POST",
        body: payload,
    });
}

export async function refreshToken(payload) {
    return apiRequest("/api/auth/refresh-token", {
        method: "POST",
        body: payload,
    });
}
