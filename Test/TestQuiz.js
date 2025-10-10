import { QuizEngine } from '../src/QuizEngine.js'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask (question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()))
  })
}

function timerDisplay (quiz) {
  const interval = setInterval(() => {
    if (quiz.timer && quiz.timer.seconds) {
      const timeLeft = quiz.timer.getTimeLeft()

      if (timeLeft > 0) {
        // Visa tiden kvar på samma rad.
        process.stdout.write(`\rTid kvar: ${timeLeft} sekunder: `)
      } else {
        clearInterval(interval)
        console.log('\nTiden är ute!')
        console.log('Tryck ENTER för nästa fråga')
      }
    }
  }, 500)
  return interval
}

try {
  const quiz = new QuizEngine()

  // Test 1: Lägg till frågor
  quiz.addQuestion('Vad är 2 + 2?', ['3', '4', '5', '6'], 1)
  quiz.addQuestion('Huvudstad i Sverige?', ['Stockholm', 'Göteborg', 'Malmö'], 0)
  quiz.addQuestion('Vad är 10 / 2?', ['5', '4', '6'], 0)
  quiz.addQuestion('JavaScript skapades år?', ['1995', '1990', '2000'], 0)
  quiz.addQuestion('Vilket år landade Apollo 11 på månen?', ['1965', '1969', '1971'], 1)
  quiz.addQuestion('Vad är huvudstaden i Frankrike?', ['Berlin', 'Madrid', 'Paris'], 2)

  quiz.startQuiz(3, 5
  )

  // Visa alla frågor som lagts till
  console.log('\n Tillagda frågor:')

  let questionNumber = 1
  let question = quiz.getNextQuestion()

  while (question) {
    console.log(`\n${questionNumber}. ${question.text}\n`)
    question.answers.forEach((answer, index) => {
      const answerNumber = index + 1
      console.log(`${answerNumber}. ${answer}`)
    })

    const timer = timerDisplay(quiz)  // Vänta på att användaren trycker ENTER för att starta frågan
    const answer = await ask('\nDitt svar (ange siffra): \n')
    clearInterval(timer)

   if (quiz.timer.isExpired()) {
      quiz.checkAnswer(null)
    } else {
      const answerIndex = parseInt(answer) - 1
      const isCorrect = quiz.checkAnswer(answerIndex)
      console.log(isCorrect ? "Rätt!" : "Fel!")
    }

    questionNumber++
    question = quiz.getNextQuestion()
  }

  console.log(quiz.getStats())
  rl.close()
} catch (error) {
  console.error(error.message)
}
