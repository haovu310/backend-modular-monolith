import { httpRequest } from '../http_call/HttpRequest';
import { ADMIN_URL } from '../service_url/RouteUrlConfig';

export const AuthService = {
    /**
     * Login admin.
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<Object>} Admin object or null if failed
     */
    login: async (email, password) => {
        try {
            const result = await httpRequest(`${ADMIN_URL}/login`, 'POST', { email, password });
            if (result && result.status === 401) {
                return null;
            }
            return result;
        } catch (error) {
            console.error("Login failed:", error);
            return null;
        }
    }
};
