// initialize everything when page loads
// startQuiz()
// startTimer()
// displayQuestion()
// checkAnswer()
// endQuiz()
let numQuestions; // Declare numQuestions as a variable using let

document.getElementById("start-button").addEventListener("click", function () {
  let numQuestionsRadios = document.getElementsByName("num-questions");
  for (let radio of numQuestionsRadios) {
    if (radio.checked) {
      numQuestions = parseInt(radio.value);
      break;
    }
  }
  if (numQuestions) {
    startQuiz(numQuestions);
  }
  console.log(numQuestions);
});
let currentQuestionIndex = 0;
let score = 0;
let timeInterval = 0;
let quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    correctAnswer: "Au",
  },
  {
    question: "Who wrote the famous play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "F. Scott Fitzgerald",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
  },
  {
    question: "Which country is famous for the kangaroo?",
    options: ["Australia", "South Africa", "Brazil", "India"],
    correctAnswer: "Australia",
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Mercury", "Mars", "Venus", "Pluto"],
    correctAnswer: "Mercury",
  },
  {
    question: "Who is the author of 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.D. Salinger", "George Orwell"],
    correctAnswer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Au", "Ag", "Cu"],
    correctAnswer: "Fe",
  },
  {
    question: "Which ocean is the largest?",
    options: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "Who discovered gravity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
    correctAnswer: "Isaac Newton",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    correctAnswer: "Tokyo",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Quartz", "Sapphire", "Graphite"],
    correctAnswer: "Diamond",
  },
  {
    question: "Who invented the telephone?",
    options: [
      "Alexander Graham Bell",
      "Thomas Edison",
      "Nikola Tesla",
      "Guglielmo Marconi",
    ],
    correctAnswer: "Alexander Graham Bell",
  },
  {
    question: "What is the currency of China?",
    options: ["Renminbi", "Yuan", "Dollar", "Yen"],
    correctAnswer: "Renminbi",
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["100°C", "0°C", "50°C", "200°C"],
    correctAnswer: "100°C",
  },
  {
    question: "Who wrote '1984'?",
    options: [
      "George Orwell",
      "Aldous Huxley",
      "Ray Bradbury",
      "Arthur C. Clarke",
    ],
    correctAnswer: "George Orwell",
  },
];
function startQuiz(numQuestions) {
  // Shuffle the quizQuestions array using Fisher-Yates algorithm
  for (let i = quizQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
  }
  quizQuestions = quizQuestions.slice(0, numQuestions);
  console.log(quizQuestions);
  // Hide the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  document.getElementById("question-choice").style.display = "none";
  displayQuestion();
}

let timeLeft;
function displayQuestion() {
  timeLeft = 31;
  startTimer();
  const answerButtons = document.getElementById("answer-buttons");
  let q = quizQuestions[currentQuestionIndex];
  // Display the question
  document.getElementById("question-text").innerHTML = q.question;
  q.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("answer-button");
    answerButtons.appendChild(button);
    button.addEventListener("click", () => {
      checkAnswer(button.innerText);
    });
  });
}

function checkAnswer(option) {
  if (option == quizQuestions[currentQuestionIndex].correctAnswer) {
    score++;
  }
  console.log(score);
  currentQuestionIndex++;
  // If we've reached the end of the questions, show the results
  if (currentQuestionIndex == numQuestions) {
    endQuiz();
    console.log(currentQuestionIndex);
  } else {
    document.getElementById("question-text").innerHTML = "";
    document.getElementById("answer-buttons").innerHTML = "";
    displayQuestion();
    clearInterval(timeInterval);
  }
}

function startTimer() {
    timeInterval = setInterval(function () {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
}

function endQuiz() {
  document.getElementById("question-text").innerHTML = "Quiz Completed!";
  document.getElementById("answer-buttons").innerHTML = "";
  document.getElementById("timer-text").innerHTML = "";
  let percentage = Math.round((score / numQuestions) * 100);
  document.getElementById("question-container").innerHTML =
    "You Score :" +
    score +
    " out of " +
    numQuestions +
    "<br>Your Percentage is: " +
    percentage +
    "%";
  clearInterval(timeInterval);
}
