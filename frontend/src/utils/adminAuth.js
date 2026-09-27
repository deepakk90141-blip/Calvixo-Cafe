const ADMIN_TOKEN_KEY = 'calvixo_admin_token';

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const saveAdminToken = (token) => localStorage.setItem(ADMIN_TOKEN_KEY, token);

export const clearAdminToken = () => localStorage.removeItem(ADMIN_TOKEN_KEY);

export const isAdminAuthenticated = () => Boolean(getAdminToken());
