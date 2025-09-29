class Timer {
 constructor(seconds) {
    this.seconds = seconds
    this.startTime = null
 }

 start() {
  this.startTime = Date.now()
 }

 isExpired() {
  if (!this.startTime || !this.seconds) return false
  const elapsed = (Date.now() - this.startTime) / 1000
  return elapsed > this.seconds
 }

 getTimeLeft() {
  if (!this.startTime || !this.seconds) return null
  const elapsed = (Date.now() - this.startTime) / 1000
  return Math.max(0, Math.round(this.seconds - elapsed))
 }
}

export { Timer }