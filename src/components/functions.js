import ReactDOM from 'react-dom'

export const GetElementY = domElement => {
  return window.pageYOffset + domElement.getBoundingClientRect().top
}
export const InterScroll = (element, duration) => {
  let domElement = element
  let startingY = window.pageYOffset
  let elementY = GetElementY(domElement)
  // If element is close to page's bottom then window will scroll only to some position above the element.
  let targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY
  let diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  let easing = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  let start

  if (!diff) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    let time = timestamp - start
    // Get percent of completion in range [0, 1].
    let percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}
