class AnswerLog {
  constructor() {
    this.entries = [] 
  }

  addEntry(questionText, selectedIndex, correctIndex, isCorrect, timeExpired) {
    this.entries.push({
      question: questionText,
      selected: selectedIndex,
      correct: correctIndex,
      isCorrect,
      timeExpired,
      timestamp: new Date().toISOString()
    })
  }

  getAnswerLog() {
    return [...this.entries]
  }

  getAnswerStats() {
    const totalAnswers = this.entries.length
    const correctAnswers = this.entries.filter(entry => entry.isCorrect).length
    const timeouts = this.entries.filter(entry => entry.timeExpired).length
    return {
      total: totalAnswers,
      correct: correctAnswers,
      wrong: totalAnswers - correctAnswers,
      timeouts
    }
  }

  getSummary() {
    return this.entries.map(entry => ({
      question: entry.question,
      status: entry.isCorrect ? "Correct" : entry.timeExpired ? "Times up!" : "Wrong"
    }))
  }

  clear() {
    this.entries = []
  }
}

export { AnswerLog }