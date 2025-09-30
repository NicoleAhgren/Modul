import { QuizEngine } from '../src/QuizEngine.js'

try {
  const quiz = new QuizEngine()

  // Test 1: Lägg till frågor
  quiz.addQuestion("Vad är 2 + 2?", ["3", "4", "5", "6"], 1)
  quiz.addQuestion("Huvudstad i Sverige?", ["Stockholm", "Göteborg", "Malmö"], 0)
  quiz.addQuestion("Vad är 10 / 2?", ["5", "4", "6"], 0)
  quiz.addQuestion("JavaScript skapades år?", ["1995", "1990", "2000"], 0)
  quiz.addQuestion("Vilket år landade Apollo 11 på månen?", ["1965", "1969", "1971"], 1)
  quiz.addQuestion("Vad är huvudstaden i Frankrike?", ["Berlin", "Madrid", "Paris"], 2)

  quiz.startQuiz(3 , null)
  
  // Visa alla frågor som lagts till
  console.log("\n Tillagda frågor:")

  let questionNumber = 1
  let question = quiz.getNextQuestion()  

  while (question) {
    console.log(`${questionNumber}. ${question.text}`)
    console.log(` Alternativ: ${question.answers.join(', ')}`)
    console.log(` Rätt svar: ${question.answers[question.correctIndex]} (index ${question.correctIndex})\n`)
    
    questionNumber++
    question = quiz.getNextQuestion()
  }

  } catch (error) {
    console.error(error.message)
  }

  