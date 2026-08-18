
const API_URL = "http://localhost:5001/api";

// Get token
const getToken = () => {
    return localStorage.getItem("token");
};

// Common request function
const request = async (url, options = {}) => {
    const token = getToken();

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mesage || data.message || "Something went wrong");
    }

    return data;
};

// Register
export const registerUser = async (userData) => {
    return request("/user/register", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

// Login
export const loginUser = async (userData) => {
    return request("/user/login", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

// Current user
export const getCurrentUser = async () => {
    return request("/user/current");
};

// Get contacts
export const getContacts = async () => {
    return request("/contacts/");
};

// Create contact
export const createContact = async (contactData) => {
    return request("/contacts/", {
        method: "POST",
        body: JSON.stringify(contactData),
    });
};

// Update contact
export const updateContact = async (id, contactData) => {
    return request(`/contacts/${id}`, {
        method: "PUT",
        body: JSON.stringify(contactData),
    });
};

// Delete contact
export const deleteContact = async (id) => {
    return request(`/contacts/${id}`, {
        method: "DELETE",
    });
};