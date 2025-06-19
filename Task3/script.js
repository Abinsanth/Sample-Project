window.onload = function () {
  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: "Mars"
    },
    {
      question: "What is 5 + 7?",
      answers: ["10", "12", "13", "14"],
      correct: "12"
    },
    {
      question: "What does CSS stand for?",
      answers: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
      correct: "Cascading Style Sheets"
    },
    {
      question: "Which language runs in a web browser?",
      answers: ["Java", "C", "Python", "JavaScript"],
      correct: "JavaScript"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionBox = document.getElementById("question-box");
  const answersBox = document.getElementById("answers-box");
  const nextBtn = document.getElementById("next-btn");
  const resultContainer = document.getElementById("result-container");
  const quizContainer = document.getElementById("quiz-container");
  const scoreDisplay = document.getElementById("score");
  const jokeSetup = document.getElementById("joke-setup");
  const jokePunchline = document.getElementById("joke-punchline");

  function showQuestion() {
    const q = questions[currentQuestion];
    questionBox.textContent = q.question;
    answersBox.innerHTML = "";
    q.answers.forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.className = "choice-btn";
      btn.onclick = () => selectAnswer(answer);
      answersBox.appendChild(btn);
    });
  }

  function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestion].correct;
    const buttons = answersBox.querySelectorAll("button");
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
        btn.style.backgroundColor = "#28a745"; 
        btn.style.color = "#fff";
      } else if (btn.textContent === answer) {
        btn.style.backgroundColor = "#dc3545";
        btn.style.color = "#fff";
      }
    });
    if (answer === correctAnswer) score++;
    nextBtn.style.display = "block";
  }

  nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
      nextBtn.style.display = "none";
    } else {
      endQuiz();
    }
  };

  function endQuiz() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreDisplay.textContent = score;
    fetchJoke();
  }

  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(response => response.json())
      .then(data => {
        jokeSetup.textContent = data.setup;
        jokePunchline.textContent = data.punchline;
      })
      .catch(() => {
        jokeSetup.textContent = "Oops! Couldn't fetch a joke.";
        jokePunchline.textContent = "";
      });
  }

  showQuestion();
};
