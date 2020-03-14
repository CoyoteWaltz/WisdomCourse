function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function getLocalTime (timezoneOffSet) {
  return new Date(new Date() + timezoneOffSet * 3600 * 1000)
}

function semester2Value (name) {
  const seasons = ['秋', '冬', '春', '夏']
  const numReg = new RegExp(/(20\d{2})-20\d{2}/)
  const year = name.match(numReg)
  let result = -1
  if (!year) {
    // 不匹配直接返-1
    return result
  }
  seasons.forEach((value, index) => {
    for (let c of name) {
      if (c === value) {
        result = parseInt(year[1] + index)
      }
    }
  })
  return result
}

export default {
  deepCopy,
  getLocalTime,
  semester2Value
}
