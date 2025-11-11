function throttle<A extends unknown[]>(
  func: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  let lastCall = 0

  return function (...args: A) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCall

    if (timeSinceLastCall > delay) {
      lastCall = now
      func(...args)
    }
  }
}

export { throttle }
