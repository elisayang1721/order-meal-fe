// eslint-disable-next-line no-extend-native
Number.prototype.format =  function () {
  let num = this
  if (num.toString().length > 3) {
    num = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
  return `$${num}`
}
