import { httpRequest } from '../http_call/HttpRequest';
import { PROPERTY_URL } from '../service_url/RouteUrlConfig';

/**
 * Service to handle Property related API calls.
 * Ensures strict separation between UI and API logic.
 */
export const PropertyService = {
    /**
     * Fetch all properties from the backend.
     * @returns {Promise<Array>} List of properties
     */
    getAllProperties: async () => {
        try {
            const data = await httpRequest(PROPERTY_URL, 'GET');
            // Handle pagination response if 'content' exists, otherwise return data directly
            return data.content || data;
        } catch (error) {
            console.error("Error loading properties:", error);
            // Return empty array to prevent UI crash
            return [];
        }
    },

    /**
     * Create a new property.
     * @param {Object} propertyData - { name, agentEmail, price }
     * @returns {Promise<Object>} Created property or error
     */
    createProperty: async (propertyData) => {
        try {
            return await httpRequest(PROPERTY_URL, 'POST', propertyData);
        } catch (error) {
            console.error("Error creating property:", error);
            throw error;
        }
    }
};
