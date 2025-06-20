// src/data/questions.js

export const questionsPool = [
  {
    question: "Quelle est la capitale de la France ?",
    answers: [
      { text: "Paris", points: 50, revealed: false },
      { text: "Lyon", points: 10, revealed: false },
      { text: "Marseille", points: 15, revealed: false },
      { text: "Nice", points: 5, revealed: false },
      { text: "Bordeaux", points: 8, revealed: false },
      { text: "Toulouse", points: 12, revealed: false },
      { text: "Nantes", points: 6, revealed: false },
      { text: "Strasbourg", points: 7, revealed: false },
      { text: "Mulhouse", points: 3, revealed: false },
      { text: "Montpellier", points: 9, revealed: false }
    ]
  },
  {
    question: "Nommez une boisson gazeuse populaire.",
    answers: [
      { text: "Coca-Cola", points: 40, revealed: false },
      { text: "Pepsi", points: 30, revealed: false },
      { text: "Fanta", points: 20, revealed: false },
      { text: "7Up", points: 10, revealed: false },
      { text: "Sprite", points: 25, revealed: false },
      { text: "Mountain Dew", points: 15, revealed: false },
      { text: "Dr Pepper", points: 18, revealed: false },
      { text: "Schweppes", points: 8, revealed: false },
      { text: "RC Cola", points: 5, revealed: false },
      { text: "Sunkist", points: 12, revealed: false }
    ]
  }
];

export function getRandomQuestion() {
  const index = Math.floor(Math.random() * questionsPool.length);
  // Renvoie une copie de la question pour éviter toute mutation de l'original
  return JSON.parse(JSON.stringify(questionsPool[index]));
}
