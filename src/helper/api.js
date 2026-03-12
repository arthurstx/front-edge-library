const API_URL = import.meta.env.VITE_API_URL

/**
 * @typedef {Object} ApiResponse
 * @property {any} data
 * @property {string|null} error
 * @property {number} status
 */

async function request(
  path,
  {
    method = 'GET',
    body,
    token,
    headers = {},
    credentials = 'omit', // omit | include | same-origin
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

    const contentType = response.headers.get('content-type')

    let responseData = null

    if (contentType?.includes('application/json')) {
      responseData = await response.json()
    } else {
      responseData = await response.text()
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
    return {
      data: null,
      error: err?.message || 'Unknown error',
      status: 0,
    }
  }
}

/**
 * GET
 */
const get = (path, options) => request(path, { ...options, method: 'GET' })

/**
 * POST
 */
const post = (path, body, options) =>
  request(path, { ...options, method: 'POST', body })

/**
 * PUT
 */
const put = (path, body, options) =>
  request(path, { ...options, method: 'PUT', body })

/**
 * PATCH
 */
const patch = (path, body, options) =>
  request(path, { ...options, method: 'PATCH', body })

/**
 * DELETE
 */
const del = (path, options) => request(path, { ...options, method: 'DELETE' })

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
}
