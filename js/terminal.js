// ---- CONFIG ----
const PASSWORD = "Minhaj";
const NEXT_PAGE = "universe.html";

// ---- SCRIPT ----
// type: 'info' 'prompt' 'hint' 'auth' 'error' 'success' 'dim' 'default'
const lines = [
  { text: "> INITIALIZING...", pause: 300, type: "info" },
  { text: "> host: AZAEL", pause: 200, type: "default" },
  { text: "> os: Arch Linux / KDE Plasma", pause: 200, type: "default" },
  { text: "> kernel: 7.2.6-arch2-1", pause: 200, type: "default" },
  { text: "> cpu: Intel Pentium Silver N5030", pause: 200, type: "default" },
  { text: "> ram: 8 GB", pause: 200, type: "default" },
  { text: "> gpu: integrated. don't ask.", pause: 800, type: "dim" },

  { text: "", pause: 200, type: "default" },
  { text: "> this machine was never meant for anything big.", pause: 400, type: "dim" },
  { text: "> 6 watts. no dedicated graphics.", pause: 400, type: "dim" },
  { text: "> a memory ceiling Intel wrote into the spec sheet", pause: 300, type: "dim" },
  { text: "> before I even owned it.", pause: 800, type: "dim" },

  { text: "", pause: 200, type: "default" },
  { text: "> it runs a full Arch install anyway.", pause: 500, type: "default" },
  { text: "> it builds things anyway.", pause: 900, type: "default" },

  { text: "", pause: 200, type: "default" },
  { text: "> destination: NIPA", pause: 300, type: "info" },
  { text: "> distance: significant. irrelevant.", pause: 300, type: "info" },
  { text: "> Bangla module: FAILED TO LOAD.", pause: 400, type: "error" },
  { text: "> expected.", pause: 900, type: "dim" },

  { text: "", pause: 200, type: "default" },
  { text: "> I'm Minhaj.", pause: 400, type: "success" },
  { text: "> This is what I made instead of a card.", pause: 400, type: "default" },
  { text: "> Five fragments. One video. Take your time.", pause: 900, type: "default" },

  { text: "", pause: 200, type: "default" },
  { text: "> AUTHORIZATION REQUIRED", pause: 300, type: "auth" },
  { text: "> hint: the only person who calls you apu and means it", pause: 600, type: "hint" },
];

const term = document.getElementById("terminal");
const passbox = document.getElementById("passbox");
const input = document.getElementById("passinput");
const error = document.getElementById("error");

async function typeLines() {
  for (const line of lines) {
    await typeOne(line.text, line.type);
    await sleep(line.pause);
    term.appendChild(document.createTextNode("\n"));
  }
  term.classList.add("cursor");
  passbox.style.display = "block";
  input.focus();
}

function typeOne(text, type) {
  return new Promise(resolve => {
    if (text === "") return resolve();
    const span = document.createElement("span");
    span.className = "line-" + (type || "default");
    term.appendChild(span);
    let i = 0;
    const interval = setInterval(() => {
      span.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 16);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function printLine(text, type) {
  const span = document.createElement("span");
  span.className = "line-" + (type || "default");
  span.textContent = text;
  term.appendChild(span);
  term.appendChild(document.createTextNode("\n"));
}

input.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;
  const val = input.value.trim();
  if (val === PASSWORD) {
    error.textContent = "";
    term.appendChild(document.createTextNode("\n"));
    printLine("> ACCESS GRANTED.", "success");
    printLine("> Welcome, Nipa.", "success");
    printLine("> Happy birthday.", "info");
    printLine("> LOADING FRAGMENT 2...", "dim");
    sessionStorage.setItem("nipa_auth", "1");
    setTimeout(() => { window.location.href = NEXT_PAGE; }, 1600);
  } else {
    error.textContent = "> ACCESS DENIED.\n> Even Eren needed a few tries. Try again.";
    input.value = "";
  }
});

typeLines();
