const form = document.getElementById("loginForm");
const startupScreen = document.getElementById("startupScreen");
const loginScreen = document.getElementById("loginScreen");
const loadingScreen = document.getElementById("loadingScreen");
const loginButton = document.getElementById("loginButton");
const verificationStatus = document.getElementById("verificationStatus");

window.addEventListener("load", () => {
  // Presentation-only startup screen. Nothing is transmitted or stored.
  setTimeout(() => {
    verificationStatus.innerHTML =
      '<span class="startup-spinner" aria-hidden="true"></span><span>Demo verification complete.</span>';

    setTimeout(() => {
      startupScreen.style.opacity = "0";
      setTimeout(() => startupScreen.remove(), 280);
    }, 650);
  }, 1500);
});

const inputs = Array.from(form.querySelectorAll("input"));

function updateLoginButton() {
  const allFilled = inputs.every((input) => input.value.trim().length > 0);
  loginButton.disabled = !allFilled;
}

inputs.forEach((input) => {
  input.addEventListener("input", updateLoginButton);
});

updateLoginButton();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Safe demo behavior:
  // No credentials are read, stored, logged, or sent anywhere.
  loginScreen.hidden = true;
  loadingScreen.hidden = false;
});
