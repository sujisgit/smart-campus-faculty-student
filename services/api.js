import axios from "axios";
import Config from "../constants/config";

/**
 * API Service - Centralized API configuration
 *
 * This service provides a pre-configured axios instance with the correct API URL
 * based on the current environment (dev, staging, production)
 */

const apiClient = axios.create({
  baseURL: Config.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor for adding auth tokens if needed
 */
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication token here if needed
    // const token = await AsyncStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor for handling common errors
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      console.error(
        `API Error [${error.response.status}]:`,
        error.response.data,
      );
    } else if (error.request) {
      console.error("No response from API:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  },
);

/**
 * API Methods
 */

// AUTH
export const authAPI = {
  login: (data) => apiClient.post("/login", data),
  register: (data) => apiClient.post("/register", data),
};

// ANNOUNCEMENTS
export const announcementAPI = {
  getAll: () => apiClient.get("/announcements"),
  create: (data) => apiClient.post("/announcements", data),
};

// EVENTS
export const eventAPI = {
  getAll: () => apiClient.get("/events"),
  getById: (id) => apiClient.get(`/events/${id}`),
  register: (data) => apiClient.post("/register-event", data),
  getNotifications: () => apiClient.get("/notifications"),
};

// FACILITIES
export const facilityAPI = {
  getAll: () => apiClient.get("/facilities"),
  book: (data) => apiClient.post("/facility-booking", data),
  getMyBookings: (email) =>
    apiClient.get("/my-bookings", { params: { email } }),
  cancelBooking: (bookingId) =>
    apiClient.delete(`/facility-booking/${bookingId}`),
};

// FACULTY
export const facultyAPI = {
  getAll: () => apiClient.get("/faculty"),
  getByDepartment: (department) =>
    apiClient.get("/faculty-department", { params: { department } }),
  getById: (id) => apiClient.get(`/faculty/${id}`),
  add: (data) => apiClient.post("/faculty", data),
};

// COMPLAINTS
export const complaintAPI = {
  getAll: () => apiClient.get("/complaints"),
  getMyComplaints: (email) =>
    apiClient.get("/my-complaints", { params: { email } }),
  create: (data) => apiClient.post("/complaint", data),
  updateStatus: (complaintId, data) =>
    apiClient.put(`/complaint/${complaintId}`, data),
};

export default apiClient;
