let messages = [
  "Are you sure? 😢",
  "Really Sure?? 😳",
  "Think again 🥺",
  "Pookie Pleaseee 💔",
  "Just think about it... 🤔",
  "Don't break my heart 😭",
  "I'll be very sad if you say no 😔",
  "Last chance 😳"
];

let index = 0;
let yesScale = 1;

function handleNo() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noBtn.innerText = messages[index % messages.length];
  index++;

  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;

  if (yesScale > 3) {
    noBtn.style.display = "none";
    yesBtn.style.width = "100%";
    yesBtn.style.height = "80px";
    yesBtn.style.fontSize = "32px";
  }
}

function handleYes() {
  window.location.href = "yes.html";
}
