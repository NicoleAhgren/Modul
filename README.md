# Quiz Engine

En JavaScript-modul för att skapa interaktiva quiz med timer, poängsystem, slumpmässiga frågor och detaljerad statistik.

## Vad gör denna modul?

- **Skapa quiz** med flervalsfrågor
- **Hantera timer** för varje fråga 
- **Slumpa ordningen** på både frågor och svarsalternativ
- **Räkna poäng** automatiskt
- **Logga alla svar** med timestamps och svarstider
- **Generera statistik** över prestanda
- **Validera input** med robust felhantering

# Installation

# Klona projektet
git clone https://github.com/NicoleAhgren/Modul. 

import QuizEngine from '../Modul/src/index.js'

# Kom igång

  const quiz = new QuizEngine()
  
  quiz.addQuestion('What year did ABBA win Eurovision?', ['1972', '1973', '1974', '1975'], 2)
  quiz.addQuestion('Which composer is known for his symphonies and was deaf?', ['Mozart', 'Bach', 'Beethoven', 'Chopin'], 2)
  quiz.addQuestion('Which composer wrote the opera Don Giovanni?', ['Mozart', 'Bach', 'Beethoven', 'Verdi'], 0)
  quiz.addQuestion('Which band released the album Dark Side of the Moon?', ['The Beatles', 'Pink Floyd', 'Led Zeppelin', 'Queen'], 1)