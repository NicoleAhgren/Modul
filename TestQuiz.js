import { QuizEngine } from './src/QuizEngine.js'

try {
  const quiz = new QuizEngine()

  // Test 1: Lägg till frågor
  quiz.addQuestion("Vad är 2 + 2?", ["3", "4", "5", "6"], 1)
  quiz.addQuestion("Huvudstad i Sverige?", ["Stockholm", "Göteborg", "Malmö"], 0)
  quiz.addQuestion("Vad är 10 / 2?", ["5", "4", "6"], 0)
  quiz.addQuestion("JavaScript skapades år?", ["1995", "1990", "2000"], 0)

  quiz.startQuiz(2, 30)
  
  // Visa alla frågor som lagts till
  console.log("\n Tillagda frågor:")
  quiz.activeQuestions.forEach((question, index) => {
    console.log(`${index + 1}. ${question.text}`)
    console.log(` Alternativ: ${question.answers.join(', ')}`)
    console.log(` Rätt svar: ${question.answers[question.correctIndex]} (index ${question.correctIndex})`)

  })
  } catch (error) {
    console.error(error.message)
  }

  