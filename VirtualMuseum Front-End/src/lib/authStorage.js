const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "currentUser";

export function setAuthSession(authData) {
    if (typeof window === "undefined") return;

    // Tokens are kept in sessionStorage to reduce persistence risk on shared devices.
    sessionStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(
        USER_KEY,
        JSON.stringify({
            userId: authData.userId,
            email: authData.email,
            fullName: authData.fullName,
            role: authData.role,
        }),
    );

    // Keep compatibility with existing navbar/session logic.
    localStorage.setItem("userName", authData.fullName || "User");
    localStorage.setItem("isLoggedIn", "true");
}

export function clearAuthSession() {
    if (typeof window === "undefined") return;

    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
}

export function getAccessToken() {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}
