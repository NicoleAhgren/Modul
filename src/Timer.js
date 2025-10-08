class Timer {
  constructor (seconds) {
    this.seconds = seconds
    this.startTime = null
  }

  start () {
    this.startTime = Date.now()
  }

  elapsedTime () {
    if (!this.startTime || !this.seconds) return null
    return (Date.now() - this.startTime) / 1000
  }

  isExpired () {
    const elapsed = this.elapsedTime()
    if (elapsed === null) return false
    return elapsed > this.seconds
  }

  getTimeLeft () {
    const elapsed = this.elapsedTime()
    if (elapsed === null) return null
    return Math.max(0, Math.round(this.seconds - elapsed))
  }
}

export { Timer }
