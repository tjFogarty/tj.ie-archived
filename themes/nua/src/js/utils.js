export function ready(fn) {
  document.addEventListener('DOMContentLoaded', fn, false)
}

export function env() {
  if (process && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV
  }

  return 'production'
}

export const motionQuery = window.matchMedia('(prefers-reduced-motion)')