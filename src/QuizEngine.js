class Question {
  constructor(text, answers, correctIndex) {
    this.text = text
    this.answers = answers
    this.correctIndex = correctIndex
  }
}

class QuizEngine {
  constructor() {
    this.allQuestions = [] // All added questions
    this.activeQuestions = [] // Questions in the current quiz session
    this.currentIndex = -1 // Index of the current question
    this.score = 0 // Number of correct answers/points
    this.correctAnswers = [] // Correct answers given
    this.answerLog = [] // Log of all answers given. Is used to calculate score
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
}