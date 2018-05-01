function getNow () {
  return new Date()
}

function formatZero (num) {
  return `${num < 10 ? '0' : ''}${num}`
}

function date (format = 'Y-m-d H:i:s') { // Y-m-d H:m:i
  const now = getNow()

  format = format.replace('Y', now.getFullYear())
  format = format.replace('m', formatZero(now.getMonth() + 1))
  format = format.replace('d', formatZero(now.getDate()))
  format = format.replace('H', formatZero(now.getHours()))
  format = format.replace('i', formatZero(now.getMinutes()))
  format = format.replace('s', formatZero(now.getSeconds()))

  return format
}

export default date
