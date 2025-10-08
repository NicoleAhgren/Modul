import { Question } from './Question.js'
import { Timer } from './Timer.js'
import { AnswerLog } from './AnswerLog.js'

class QuizEngine {
  constructor () {
    this.allQuestions = [] // All added questions
    this.activeQuestions = [] // Questions in the current quiz session
    this.currentIndex = -1 // Index of the current question
    this.score = 0
    this.correctAnswers = [] // Correct answers given
    this.answerLog = new AnswerLog() // Log of all answers
    this.timer = null
  }

  addQuestion (text, answers, correctIndex) {
    if (!text) {
      throw new Error('Invalid question format')
    }
    if (!Array.isArray(answers) || answers.length < 2) {
      throw new Error('A question must have at least two possible answers')
    }
    if (typeof correctIndex !== 'number' || correctIndex < 0 || correctIndex >= answers.length) {
      throw new Error('Correct answer index is out of bounds')
    }
    const question = new Question(text, answers, correctIndex)
    this.allQuestions.push(question)
  }

  shuffleArray (array) {
    const shuffled = [...array]
    let i = shuffled.length, randomIndex, tempValue

    while (--i > 0) {
      randomIndex = Math.floor(Math.random() * (i + 1))
      tempValue = shuffled[randomIndex]
      shuffled[randomIndex] = shuffled[i]
      shuffled[i] = tempValue
    }

    return shuffled
  }

  shuffleAnswers (question) {
    const correctAnswer = question.answers[question.correctIndex]
    const shuffledAnswers = this.shuffleArray([...question.answers])
    const newIndex = shuffledAnswers.indexOf(correctAnswer)

    return {
      shuffledAnswers,
      newCorrectIndex: newIndex
    }
  }

  startQuiz (limit = null, seconds = null) {
    if (this.allQuestions.length === 0) {
      throw new Error('No questions available to start the quiz')
    }
    // If limit is null or greater than available questions, use all questions
    if (limit !== null && (typeof limit !== 'number' || limit < 1 || !Number.isInteger(limit))) {
      throw new Error('Limit must be a positive integer')
    }

    const totalQuestions = this.allQuestions.length
    const numQuestions = limit ? Math.min(limit, totalQuestions) : totalQuestions // number of questions to use

    // creates a copy of the array, shuffles it and selects the first questions from the array/starts quiz.
    const shuffled = this.shuffleArray([...this.allQuestions])
    this.activeQuestions = shuffled.slice(0, numQuestions)
    this.timer = new Timer(seconds)

    // Reset quiz state
    this.currentIndex = -1
    this.score = 0
    this.correctAnswers = []
    this.answerLog = new AnswerLog()
  }

  getNextQuestion () {
    // Returns the next question or null if there are no more questions
    if (this.currentIndex + 1 >= this.activeQuestions.length) {
      return null
    }
    this.currentIndex++
    this.timer.start()

    const question = this.activeQuestions[this.currentIndex]
    const shuffle = this.shuffleAnswers(question)

    question.shuffledCorrectIndex = shuffle.newCorrectIndex

    return {
      text: question.text,
      answers: shuffle.shuffledAnswers,
      correctIndex: shuffle.newCorrectIndex
    }
  }

  checkAnswer (answerIndex) {
    const currentQ = this.activeQuestions[this.currentIndex]
    const timeExpired = this.timer.isExpired() || false
    const correctAnswer = !timeExpired && answerIndex === currentQ.shuffledCorrectIndex
    const answerTime = timeExpired ? null : this.timer.elapsedTime()

    if (correctAnswer) {
      this.score++
      this.correctAnswers.push(currentQ)
    }

    this.answerLog.addEntry(
      currentQ.text,
      answerIndex,
      currentQ.shuffledCorrectIndex,
      correctAnswer,
      timeExpired,
      answerTime
    )
    return correctAnswer
  }

  getScore () {
    return this.score
  }

  // Resets the quiz without changing the question pool
  resetQuiz () {
    this.currentIndex = -1
    this.score = 0
    this.correctAnswers = []
    this.answerLog.clear()
  }

  getAnswerLog () {
    return this.answerLog.getAnswerLog()
  }

  getStats () {
    return this.answerLog.getAnswerStats()
  }

  summary () {
    return this.answerLog.getSummary()
  }
}

export { QuizEngine }
