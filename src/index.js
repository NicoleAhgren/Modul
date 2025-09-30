import { QuizEngine } from './QuizEngine.js'

// Skapa en quiz engine
const quiz = new QuizEngine()

// Lägg till några testfrågor
try {
  quiz.addQuestion("Vad är 2 + 2?", ["3", "4", "5", "6"], 1)
  quiz.addQuestion("Huvudstad i Sverige?", ["Stockholm", "Göteborg", "Malmö"], 0)
  quiz.addQuestion("Vad är 10 / 2?", ["5", "4", "6"], 0)
  
  console.log("✅ Frågor tillagda!")
  
  // Starta quiz med 2 frågor och 10 sekunder per fråga
  quiz.startQuiz(2, 10)
  console.log("✅ Quiz startad!")
  
  // Hämta första frågan
  const question1 = quiz.getNextQuestion()
  if (question1) {
    console.log("\n📝 Fråga 1:", question1.text)
    console.log("Alternativ:", question1.answers)
    console.log("Progress:", quiz.getProgress())
    
    // Simulera ett svar (välj alternativ 1)
    const isCorrect = quiz.checkAnswer(1)
    console.log("Svar korrekt:", isCorrect)
    console.log("Poäng:", quiz.getScore())
  }
  
  // Hämta andra frågan
  const question2 = quiz.getNextQuestion()
  if (question2) {
    console.log("\n📝 Fråga 2:", question2.text)
    console.log("Alternativ:", question2.answers)
    console.log("Progress:", quiz.getProgress())
    
    // Simulera ett svar (välj alternativ 0)
    const isCorrect = quiz.checkAnswer(0)
    console.log("Svar korrekt:", isCorrect)
    console.log("Poäng:", quiz.getScore())
  }
  
  // Visa sammanfattning
  console.log("\n📊 Quiz sammanfattning:")
  const summary = quiz.getAnswerSummary()
  summary.forEach((item, index) => {
    console.log(`${index + 1}. ${item.question} - ${item.status}`)
  })
  
  // Visa statistik från AnswerLog
  const stats = quiz.answerLog.getAnswerStats()
  console.log("\n📈 Statistik:")
  console.log(`Total: ${stats.total}`)
  console.log(`Rätt: ${stats.correct}`)
  console.log(`Fel: ${stats.wrong}`)
  console.log(`Timeouts: ${stats.timeouts}`)
  
} catch (error) {
  console.error("❌ Fel:", error.message)
}
