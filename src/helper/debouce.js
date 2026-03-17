/**
 *
 * @param {()=>} func
 * @param {number} wait
 * @returns
 */
export function debounce(func, wait) {
  let timeout = null

  return function (...args) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}
