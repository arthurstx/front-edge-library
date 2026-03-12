// lib/api.js

const API_URL = import.meta.env.VITE_API_URL;

/**
 * @typedef {Object} ApiResponse
 * @property {any} data
 * @property {string|null} error
 * @property {number} status
 */

async function request(
  path,
  { method = "GET", body, token, headers = {} } = {},
) {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      return {
        data: null,
        error: error || response.statusText,
        status: response.status,
      };
    }

    const data = await response.json();
    return { data, error: null, status: response.status };
  } catch (err) {
    return { data: null, error: err.message ?? "Unknown error", status: 0 };
  }
}

/**
 * @param {string} path
 * @param {{ token?: string, headers?: Record<string, string> }} [options]
 * @returns {Promise<ApiResponse>}
 */
const get = (path, options) => request(path, { ...options, method: "GET" });

/**
 * @param {string} path
 * @param {any} body
 * @param {{ token?: string, headers?: Record<string, string> }} [options]
 * @returns {Promise<ApiResponse>}
 */
const post = (path, body, options) =>
  request(path, { ...options, method: "POST", body });

/**
 * @param {string} path
 * @param {any} body
 * @param {{ token?: string, headers?: Record<string, string> }} [options]
 * @returns {Promise<ApiResponse>}
 */
const put = (path, body, options) =>
  request(path, { ...options, method: "PUT", body });

/**
 * @param {string} path
 * @param {any} body
 * @param {{ token?: string, headers?: Record<string, string> }} [options]
 * @returns {Promise<ApiResponse>}
 */
const patch = (path, body, options) =>
  request(path, { ...options, method: "PATCH", body });

/**
 * @param {string} path
 * @param {{ token?: string, headers?: Record<string, string> }} [options]
 * @returns {Promise<ApiResponse>}
 */
const del = (path, options) => request(path, { ...options, method: "DELETE" });

export const api = { get, post, put, patch, delete: del };
