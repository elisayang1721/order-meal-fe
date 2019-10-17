const event = new Event('reachEnd')

let arr = []

/* eslint-disable import/prefer-default-export */
export function checkIfReachEnd(position) {
  if (!position.y && arr[arr.length - 1] > 0) {
    window.dispatchEvent(event)
    arr = []
  } else {
    arr.push(position.y)
  }
}
