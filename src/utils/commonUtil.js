export const findLast = (arr, fn) => {
  for (let el of arr) {
    if (fn(el)) {
      return el
    }
  }
}
