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

const PARTNER_PARAM_KEYS = ["partner", "name", "p"];
const DEFAULT_PARTNER_NAME = "Sakshi";
let index = 0;
let yesScale = 1;
let encodedPartner = "";
let decodedPartnerName = DEFAULT_PARTNER_NAME;

function getEncodedPartnerValue() {
  const params = new URLSearchParams(window.location.search);
  for (const key of PARTNER_PARAM_KEYS) {
    const value = params.get(key);
    if (value) {
      return value;
    }
  }
  return "";
}

function normalizeBase64(value) {
  if (!value) {
    return "";
  }
  let normalized = value.replace(/-/g, "+").replace(/_/g, "/").replace(/\s+/g, "");
  normalized = normalized.replace(/[^A-Za-z0-9+/=]/g, "");
  const paddingNeeded = (4 - (normalized.length % 4)) % 4;
  return normalized + "=".repeat(paddingNeeded);
}

function tryDecodePartnerName(value) {
  if (!value) {
    return "";
  }
  try {
    return atob(normalizeBase64(value));
  } catch {
    return "";
  }
}

function applyPartnerName(name) {
  if (!name) {
    return;
  }
  const nameTarget = document.getElementById("partnerName");
  const heroTitle = document.getElementById("heroTitle");

  if (nameTarget) {
    nameTarget.textContent = name;
    nameTarget.classList.add("animate");
    setTimeout(() => nameTarget.classList.remove("animate"), 420);
  }

  if (heroTitle) {
    heroTitle.textContent = `Will you be my Valentine, ${name}?`;
  }
}

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
  const nextUrl = new URL("yes.html", window.location.href);
  if (encodedPartner) {
    nextUrl.searchParams.set("partner", encodedPartner);
  }
  window.location.href = nextUrl.toString();
}

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (!yesBtn || !noBtn) {
    return;
  }

  encodedPartner = getEncodedPartnerValue();
  const derivedName = tryDecodePartnerName(encodedPartner);
  decodedPartnerName = derivedName || DEFAULT_PARTNER_NAME;
  applyPartnerName(decodedPartnerName);

  yesBtn.addEventListener("click", handleYesClick);
  noBtn.addEventListener("click", () => handleNoClick(yesBtn, noBtn));
});
