const playBtn = document.getElementById("play-button");
const pauseBtn = document.getElementById("pause-button");
const stopBtn = document.getElementById("stop-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
let currentCharacter;

// Event listeners
playBtn.addEventListener("click", () => {
  playText(textInput.value);
});

pauseBtn.addEventListener("click", pauseText);

stopBtn.addEventListener("click", stopText);

speedInput.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(currentCharacter));
});

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener("end", () => {
  textInput.disabled = false;
});
utterance.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  textInput.disabled = true;
  utterance.rate = speedInput.value || 1;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
