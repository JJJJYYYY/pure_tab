const _toString = Object.prototype.toString


export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function getRealVal (any) {
  try {
    return JSON.parse(any)
  } catch (e) {
    return any === 'false'
      ? false
      : (any === 'true'
        ? true
        : any)
  }
}

function isJSONObj (obj) {
  return isPlainObject(obj) || Array.isArray(obj)
}
export function setLocalStorage (key, val) {
  localStorage.setItem(key, isJSONObj(val) ? JSON.stringify(val) : val)
}

export function getLocalStorage (key) {
  return getRealVal(localStorage.getItem(key))
}

export function isFunction (any) {
  return typeof any === 'function'
}
