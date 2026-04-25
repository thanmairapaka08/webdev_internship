let user = "";
let questions = [];
let current = 0;
let score = 0;
let selected = null;
let timer;
let timeLeft = 10;

//  AUTO LOGIN IF USER EXISTS
let saved = localStorage.getItem("currentUser");

if (saved) {
  user = saved;

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userDisplay").innerText = "Hi, " + user;
    document.getElementById("logoutBtn").classList.remove("hidden");

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("categoryBox").classList.remove("hidden");
  });
}

//  QUESTION BANK
const quizData = {
  html: [
    { q: "HTML stands for?", o: ["Hyper Text Markup Language","High Text","None","Hyper Tab"], a: 0 },
    { q: "Tag for paragraph?", o: ["<p>","<div>","<h1>","<br>"], a: 0 },
    { q: "Image tag?", o: ["<img>","<pic>","<src>","<image>"], a: 0 },
    { q: "Link tag?", o: ["<a>","<link>","<href>","<url>"], a: 0 },
    { q: "Form tag?", o: ["<form>","<input>","<button>","<label>"], a: 0 },
    { q: "Line break?", o: ["<br>","<lb>","<break>","<hr>"], a: 0 },
    { q: "Heading tag?", o: ["<h1>","<p>","<div>","<head>"], a: 0 },
    { q: "List tag?", o: ["<ul>","<li>","<ol>","All"], a: 3 },
    { q: "Input email type?", o: ["text","email","mail","input"], a: 1 },
    { q: "HTML is?", o: ["Language","Markup","DB","OS"], a: 1 }
  ],

  css: [
    { q: "CSS used for?", o: ["Logic","Styling","DB","Server"], a: 1 },
    { q: "Color property?", o: ["color","bg","font","style"], a: 0 },
    { q: "Flexbox is?", o: ["Layout","DB","API","None"], a: 0 },
    { q: "Grid is?", o: ["Layout system","Language","Tag","DB"], a: 0 },
    { q: "Margin?", o: ["Outside","Inside","Border","None"], a: 0 },
    { q: "Padding?", o: ["Inside","Outside","Border","None"], a: 0 },
    { q: "Font size?", o: ["font-size","size","text-size","None"], a: 0 },
    { q: "Background color?", o: ["background-color","color","bg","None"], a: 0 },
    { q: "Display flex?", o: ["Flexbox","Grid","Block","None"], a: 0 },
    { q: "Text align?", o: ["text-align","align","center","None"], a: 0 }
  ],

  js: [
    { q: "JS used for?", o: ["Style","Logic","Structure","None"], a: 1 },
    { q: "Keyword?", o: ["var","int","string","let"], a: 3 },
    { q: "DOM?", o: ["Doc Obj Model","Data Obj","None","Doc Model"], a: 0 },
    { q: "Function?", o: ["func","function","def","fun"], a: 1 },
    { q: "Event?", o: ["click","color","font","size"], a: 0 },
    { q: "Array syntax?", o: ["[]","{}","()","<>"], a: 0 },
    { q: "Console log?", o: ["console.log()","print()","echo()","log()"], a: 0 },
    { q: "If condition?", o: ["if()","if{}","if","cond"], a: 0 },
    { q: "Loop?", o: ["for","loop","iterate","None"], a: 0 },
    { q: "JS type?", o: ["Interpreted","Compiled","Both","None"], a: 0 }
  ]
};

//  LOGIN
function login() {
    let name = document.getElementById("username").value;
  
    if (!name) {
      alert("Enter name!");
      return;
    }
  
    user = name;
  
    //  SAVE USER HERE
    localStorage.setItem("currentUser", user);
  
    document.getElementById("userDisplay").innerText = "Hi, " + user;
    document.getElementById("logoutBtn").classList.remove("hidden");
  
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("categoryBox").classList.remove("hidden");
  }

//  START QUIZ → RANDOM 5 QUESTIONS
function startQuiz(cat) {
  questions = quizData[cat]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5); //  ONLY 5 QUESTIONS

  current = 0;
  score = 0;

  document.getElementById("categoryBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  loadQuestion();
}
function logout() {
    // reset user
    user = "";
  
    // clear input
    document.getElementById("username").value = "";
  
    // hide all sections
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("leaderboardBox").classList.add("hidden");
    document.getElementById("categoryBox").classList.add("hidden");
  
    // show login
    document.getElementById("loginBox").classList.remove("hidden");
  
    // clear header
    document.getElementById("userDisplay").innerText = "";
  
    // hide logout button
    document.getElementById("logoutBtn").classList.add("hidden");
  }
// LOAD QUESTION + SHUFFLE OPTIONS
function loadQuestion() {
  selected = null;
  timeLeft = 10;

  let q = questions[current];

  document.getElementById("question").innerText = q.q;
  document.getElementById("progress").innerText =
    `Q ${current+1}/5`;

  // shuffle options
  let options = q.o.map((opt, i) => ({
    text: opt,
    correct: i === q.a
  }));

  options.sort(() => Math.random() - 0.5);
  q.correctIndex = options.findIndex(o => o.correct);

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = opt.text;
    btn.onclick = () => selectAnswer(i);
    optDiv.appendChild(btn);
  });

  startTimer();
}

//  SELECT
function selectAnswer(i) {
  if (selected !== null) return;
  selected = i;

  let btns = document.querySelectorAll(".option");

  btns.forEach((b, index) => {
    b.disabled = true;

    if (index === questions[current].correctIndex) {
      b.style.background = "green";
    } else if (index === i) {
      b.style.background = "red";
    }
  });

  if (i === questions[current].correctIndex) score++;
}

//  TIMER
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

//  NEXT
function nextQuestion() {
  clearInterval(timer);
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

//  RESULT
function showResult() {
    clearInterval(timer);
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.remove("hidden");
  
    document.getElementById("finalScore").innerText =
      `${user} Score: ${score}/5`;
  
    // SAVE SCORE
    let data = JSON.parse(localStorage.getItem("scores")) || [];
    data.push({ user, score });
  
    localStorage.setItem("scores", JSON.stringify(data));
  }
  function showLeaderboard() {
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("leaderboardBox").classList.remove("hidden");
  
    let data = JSON.parse(localStorage.getItem("scores")) || [];
  
    // sort highest score first
    data.sort((a, b) => b.score - a.score);
  
    let list = document.getElementById("leaderboard");
    list.innerHTML = "";
  
    if (data.length === 0) {
      list.innerHTML = "<li>No scores yet</li>";
      return;
    }
  
    data.forEach((d, i) => {
      let li = document.createElement("li");
      li.innerText = `${i + 1}. ${d.user} - ${d.score}`;
      list.appendChild(li);
    });
  }
  function restart() {
    // reset values
    current = 0;
    score = 0;
    selected = null;
  
    // hide all sections
    document.getElementById("quizBox").classList.add("hidden");
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("leaderboardBox").classList.add("hidden");
  
    //  GO BACK TO CATEGORY PAGE (NOT LOGIN)
    document.getElementById("categoryBox").classList.remove("hidden");
  }