// src/http_call/HttpRequest.js
export const httpRequest = async (url, method, data = null) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If we are sending data (like in a POST or PUT), we add it to the body
    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    // Level 3 requirement: Return the status so the UI can check for errors
    if (!response.ok) {
        return response; 
    }
    
    return response.json();
};