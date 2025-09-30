import { Question } from './Question.js'
import{ Timer } from './Timer.js'
import { AnswerLog } from './AnswerLog.js'

class QuizEngine {
  constructor() {
    this.allQuestions = [] // All added questions
    this.activeQuestions = [] // Questions in the current quiz session
    this.currentIndex = -1 // Index of the current question
    this.score = 0 // Number of correct answers/points
    this.correctAnswers = [] // Correct answers given
    this.answerLog = new AnswerLog() // Log of all answers
    this.timer = null
  }

  addQuestion(text, answers, correctIndex) {
    if (!text){
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

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[random]] = [shuffled[random], shuffled[i]]
    }
    return shuffled
  }

  startQuiz(limit = null, seconds = null) {
    if (this.allQuestions.length === 0) {
      throw new Error('No questions available to start the quiz')
    }
    // If limit is null or greater than available questions, use all questions
    if (limit !== null && (typeof limit !== 'number' || limit < 1 || !Number.isInteger(limit))) {
      throw new Error('Limit must be a positive integer')
    }

    const totalQuestions = this.allQuestions.length
    const numQuestions = limit ? Math.min(limit, totalQuestions) : totalQuestions // number of questions to use

    // creates a copy of the array, shuffles it and selects the first questions from the array.
    const shuffled = this.shuffleArray([...this.allQuestions])
    this.activeQuestions = shuffled.slice(0, numQuestions)
    
    // Reset state for new quiz session
    this.currentIndex = -1
    this.score = 0
    this.correctAnswers = []
    this.answerLog = new AnswerLog()
    this.timer = new Timer(seconds)
  }

  getNextQuestion() {
    // Returns the next question or null if there are no more questions
    if (this.currentIndex + 1 >= this.activeQuestions.length) {
      return null
    }
    this.currentIndex++
    return this.activeQuestions[this.currentIndex]
  }
}

export { QuizEngine }