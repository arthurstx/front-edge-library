import { tokenStore } from '../helper/auth'
const API_URL = import.meta.env.VITE_API_URL

let isRefreshing = false
let refreshQueue = []

function processQueue(error, token = null) {
  refreshQueue.forEach((cb) => (error ? cb.reject(error) : cb.resolve(token)))
  refreshQueue = []
}

async function refreshAccessToken() {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  })
  if (!response.ok) return null
  const data = await response.json()
  return data.token ?? null
}

/**
 * @typedef {Object} ApiResponse
 * @property {any} data
 * @property {string|null} error
 * @property {number} status
 */

/**
 * @param {string} path
 * @param {{ method?: string, body?: any, token?: string, headers?: Record<string, string>, credentials?: RequestCredentials, _retry?: boolean }} [options]
 * @returns {Promise<ApiResponse>}
 */
async function request(
  path,
  {
    method = 'GET',
    body,
    token,
    headers = {},
    credentials = 'omit',
    _retry = false,
  } = {},
) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      credentials,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    })

    console.log(response)

    const contentType = response.headers.get('content-type')
    let responseData = null

    if (contentType?.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
    }

    if (response.status === 401 && !_retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        }).then((newToken) =>
          request(path, {
            method,
            body,
            headers,
            credentials,
            token: newToken,
            _retry: true,
          }),
        )
      }

      isRefreshing = true

      const newToken = await refreshAccessToken()

      isRefreshing = false

      if (!newToken) {
        processQueue(new Error('Session expired'))
        tokenStore.clear()
        return { data: null, error: 'Session expired', status: 401 }
      }

      tokenStore.set(newToken)
      processQueue(null, newToken)

      return request(path, {
        method,
        body,
        headers,
        credentials,
        token: newToken,
        _retry: true,
      })
    }

    if (!response.ok) {
      return {
        data: null,
        error: responseData?.error || responseData || response.statusText,
        status: response.status,
      }
    }

    return {
      data: responseData,
      error: null,
      status: response.status,
    }
  } catch (err) {
    if (import.meta.env.DEV) console.error(`[api] ${method} ${path}`, err)
    return {
      data: null,
      error: err?.message || 'Unknown error',
      status: 0,
    }
  }
}

/**
 * @param {string} path
 * @param {Object} [options]
 * @returns {Promise<ApiResponse>}
 */
const get = (path, options) => request(path, { ...options, method: 'GET' })

/**
 * @param {string} path
 * @param {any} body
 * @param {Object} [options]
 * @returns {Promise<ApiResponse>}
 */
const post = (path, body, options) =>
  request(path, { ...options, method: 'POST', body })

/**
 * @param {string} path
 * @param {any} body
 * @param {Object} [options]
 * @returns {Promise<ApiResponse>}
 */
const put = (path, body, options) =>
  request(path, { ...options, method: 'PUT', body })

/**
 * @param {string} path
 * @param {any} body
 * @param {Object} [options]
 * @returns {Promise<ApiResponse>}
 */
const patch = (path, body, options) =>
  request(path, { ...options, method: 'PATCH', body })

/**
 * @param {string} path
 * @param {Object} [options]
 * @returns {Promise<ApiResponse>}
 */
const del = (path, options) => request(path, { ...options, method: 'DELETE' })

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
}
