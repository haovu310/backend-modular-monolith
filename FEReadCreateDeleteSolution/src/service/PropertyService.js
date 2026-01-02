import { httpRequest } from '../http_call/HttpRequest';
import { PROPERTY_URL } from '../service_url/RouteUrlConfig';

/**
 * Service to handle Property related API calls.
 * Ensures strict separation between UI and API logic.
 */
export const PropertyService = {
    /**
     * Fetch all properties from the backend with pagination and sorting.
     * @param {number} page - Page number (default 0)
     * @param {string} sortBy - Sort field (default 'id')
     * @returns {Promise<Object>} Full pagination response (content, totalPages, etc.)
     */
    getAllProperties: async (page = 0, sortBy = 'id') => {
        try {
            // Construct URL with query parameters
            const url = `${PROPERTY_URL}?page=${page}&size=4&sortBy=${sortBy}`;
            const data = await httpRequest(url, 'GET');
            return data; // Return full object to access 'content' and 'totalPages' in UI
        } catch (error) {
            console.error("Error loading properties:", error);
            // Return structure matching empty response
            return { content: [], totalPages: 0 };
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
    },

    /**
     * Update an existing property.
     * @param {number} id - Property ID
     * @param {Object} propertyData - Updated data
     * @returns {Promise<Object>} Updated property
     */
    updateProperty: async (id, propertyData) => {
        try {
            return await httpRequest(`${PROPERTY_URL}/${id}`, 'PUT', propertyData);
        } catch (error) {
            console.error(`Error updating property ${id}:`, error);
            throw error;
        }
    },

    /**
     * Delete a property by ID.
     * @param {number} id - Property ID
     * @returns {Promise<void>}
     */
    deleteProperty: async (id) => {
        try {
            return await httpRequest(`${PROPERTY_URL}/${id}`, 'DELETE');
        } catch (error) {
            console.error(`Error deleting property ${id}:`, error);
            throw error;
        }
    }
};
