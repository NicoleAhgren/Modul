# Quiz Engine

En JavaScript-modul för att skapa interaktiva quiz med timer, poängsystem, slumpmässiga frågor och detaljerad statistik.

## Vad gör denna modul?

- **Skapa quiz**  med flervalsfrågor
- **Slumpa ordningen** på frågor och svarsalternativ
- **Hantera timer** för varje fråga (valfritt eller välj egen tid)
- **Räkna poäng** automatiskt
- **Logga alla svar** med timestamps och svarstider
- **Generera statistik** Antal rätt/fel, timeouts och svarstid
- **Validera input** med felhantering

## Installation

## Klona projektet
```bash
git clone https://github.com/NicoleAhgren/Modul. 
```
## Kom igång 
#### kod exempel:
#### Skapa en quiz, lägg till frågor med svar, starta quizen med antalet frågor och tid per fråga, Skriv ut  blandade frågor, dess svars alternativ och det rätta svaret med rätt index.

```javascript
import QuizEngine from '../Modul/src/index.js'

const quiz = new QuizEngine()
quiz.addQuestion("Vad är 2 + 2?", ["3", "4", "5", "6"], 1)
  quiz.addQuestion("Huvudstad i Sverige?", ["Stockholm", "Göteborg", "Malmö"], 0)
  quiz.addQuestion("Vad är 10 / 2?", ["5", "4", "6"], 0)
  quiz.addQuestion("JavaScript skapades år?", ["1995", "1990", "2000"], 0)
  
  quiz.startQuiz(3, 10)

   console.log("\n Tillagda frågor:")

  quiz.activeQuestions.forEach((question, index) => {
    console.log(`${index + 1}. ${question.text}`)
    console.log(` Alternativ: ${question.answers.join(', ')}`)
    console.log(` Rätt svar: ${question.answers[question.correctIndex]} (index ${question.correctIndex})`)
  })
```

## Licence
MIT Licence - https://github.com/NicoleAhgren/Modul/blob/main/LICENSE

