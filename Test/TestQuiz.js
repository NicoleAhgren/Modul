import { QuizEngine } from '../src/QuizEngine.js'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()))
  })
}

try {
  const quiz = new QuizEngine()

  // Test 1: Lägg till frågor
  quiz.addQuestion("Vad är 2 + 2?", ["3", "4", "5", "6"], 1)
  quiz.addQuestion("Huvudstad i Sverige?", ["Stockholm", "Göteborg", "Malmö"], 0)
  quiz.addQuestion("Vad är 10 / 2?", ["5", "4", "6"], 0)
  quiz.addQuestion("JavaScript skapades år?", ["1995", "1990", "2000"], 0)
  quiz.addQuestion("Vilket år landade Apollo 11 på månen?", ["1965", "1969", "1971"], 1)
  quiz.addQuestion("Vad är huvudstaden i Frankrike?", ["Berlin", "Madrid", "Paris"], 2)

  quiz.startQuiz(3 , 15)
  
  // Visa alla frågor som lagts till
  console.log("\n Tillagda frågor:")

  let questionNumber = 1
  let question = quiz.getNextQuestion()  

  while (question) {
    console.log(`\n${questionNumber}. ${question.text}\n`)
    question.answers.forEach((answer, index) => {
      const answerNumber = index + 1
      console.log(`${answerNumber}. ${answer}`)
    })

    const answer = await ask("\nDitt svar (ange siffra): ")
  
    const answerIndex = parseInt(answer) - 1
    const isCorrect = quiz.checkAnswer(answerIndex)

    if (isCorrect ) {
      console.log("Rätt!\n")
    } else {
      console.log("Fel!\n")
    }

    questionNumber++
    question = quiz.getNextQuestion()
  }

  console.log(quiz.getStats())
  rl.close()

  } catch (error) {
    console.error(error.message)
  }

