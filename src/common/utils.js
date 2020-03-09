function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getLocalTime (timezoneOffSet) {
  return new Date(new Date() + timezoneOffSet * 3600 * 1000)
}

export default {
  deepCopy,
  getLocalTime
}
