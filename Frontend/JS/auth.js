export function auth (token, user) {
    if (!token) {
        window.location.href = '../Html/log-in.html';
    }
    if (!user) {
        window.location.href = '../Html/log-in.html';
    }
}
