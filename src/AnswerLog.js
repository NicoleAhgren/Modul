
class AnswerLog {
  constructor () {
    this.entries = []
  }

  addEntry (questionText, selectedIndex, shuffledCorrectIndex, isCorrect, timeExpired, answerTime) {
    this.entries.push({
      question: questionText,
      selected: selectedIndex,
      correct: shuffledCorrectIndex,
      isCorrect,
      answerTime,
      timeExpired,
      timestamp: new Date().toISOString()
    })
  }

  getAnswerLog () {
    return [...this.entries]
  }

  getAnswerStats () {
    const totalAnswers = this.entries.length
    const correctAnswers = this.entries.filter(entry => entry.isCorrect).length
    const timeouts = this.entries.filter(entry => entry.timeExpired).length
    const wrongAnswers = this.entries.filter(entry => !entry.isCorrect && !entry.timeExpired).length
    return {
      total: totalAnswers,
      correct: correctAnswers,
      wrong: wrongAnswers,
      timeExpired: timeouts
    }
  }

  getSummary () {
    return this.entries.map(entry => {
      if (entry.isCorrect) {
        return { question: entry.question, status: 'Correct' }
      }
      if (entry.timeExpired) {
        return { question: entry.question, status: 'Times up!' }
      }
      return { question: entry.question, status: 'Wrong' }
    })
  }

  clear () {
    this.entries = []
  }
}

export { AnswerLog }
