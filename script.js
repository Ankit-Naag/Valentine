const messages = [
  "Are you sure? 😢",
  "Really Sure?? 😳",
  "Think again 🥺",
  "Pookie Pleaseee 💔",
  "Just think about it... 🤔",
  "Don't break my heart 😭",
  "I'll be very sad if you say no 😔",
  "Last chance 😳",
  ""
];

let index = 0;
let yesScale = 1;

function randomizeButton(noBtn) {
  const xOffset = (Math.random() - 0.5) * 220;
  const yOffset = (Math.random() - 0.5) * 40;
  noBtn.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
}

function encourageYes(yesBtn) {
  yesScale = Math.min(1.25, yesScale + 0.08);
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.classList.add("glow");
  setTimeout(() => yesBtn.classList.remove("glow"), 350);
}

function finalizeNo(noBtn, yesBtn) {
  noBtn.style.display = "none";
  yesBtn.style.width = "100%";
  yesBtn.classList.add("expanded");
}

function handleNoClick(yesBtn, noBtn) {
  if (index >= messages.length) {
    return;
  }

  noBtn.textContent = messages[index];
  index++;

  randomizeButton(noBtn);
  encourageYes(yesBtn);

  if (index === messages.length) {
    finalizeNo(noBtn, yesBtn);
  }
}

function handleYesClick() {
  window.location.href = "yes.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (!yesBtn || !noBtn) {
    return;
  }

  yesBtn.addEventListener("click", handleYesClick);
  noBtn.addEventListener("click", () => handleNoClick(yesBtn, noBtn));
});
