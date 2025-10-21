# Testrapport

Modulen har testats manuellt via testapplikationen `TestQuiz.js`.
Testapplikationen använder sig av `QuizEngine` för att starta quizet, skapa frågor och visar även ut direkt om man svarat rätt. `Timer` används för att sätta en tidsgräns per fråga och sedan används `AnswerLog` för att logga användarens svar. I testet användes även readline för att kunna ta emot och hantera användarinput.

## Hur den testades

Modulen testades genom att köra igenom applikationen många gånger med annorlunda indata. Det testades genom att skriva in rätt svar, fel svar och vänta på timeout. Indatan har skrivits in manuellt även resultaten har kontrollerats manuellt. 

## Testtabell

| Vad som testas | Hur det testas | Testresultat |
|----------------|----------------|--------------|
| addQuestion() - validering av indata | La till frågor med antingen för få svarsalternativ eller en för kort fråga | Fel kastades korrekt |
| startQuiz() - begränsat antal frågor | Testade att skriva in att limit är 3 även fast det fanns fler frågor | Endast 3 av de 5 skapade frågorna skrevs ut |
| getNextQuestion() | Kollar om den fortsätter hämta frågor ända tills null returneras | Hämtade frågorna korrekt och avslutade på sista frågan |  
| checkAnswer() | Svarade rätt, fel eller lät timern gå ut | Poäng och loggning funkar som väntat |
| Timer.isExpired() | Väntade ut tiden för att få en timeout | Returnarar true och det loggas som en timeout |
| Timer.getTimeLeft() | Visar tid kvar på frågan | Uppdateras korrekt och avslutas vid timeouts |
| AnswerLog.getAnswerStats() | Hämtar och skriver ut statistik från användarinput ( hur många rätt, fel, timeouts och totalt antal frågor) | Returnerar alla objekt korrekt |
| AnswerLog.getSummary() | Hämtar och returnerar sammanfattning och svar av alla svarade frågor ({ question: 'JavaScript skapades år?', status: 'Wrong' }) | Returnerar rätt fråga och status |
| resetQuiz() | Återställer quizet och rensar loggen | Alla värden nollställs och en ny quiz kan starta |





