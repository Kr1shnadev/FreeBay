// ==== Firebase Config & Initialization ====
// Uses the same config as script.js (login page)
const firebaseConfig = {
  apiKey: "AIzaSyCu10UwrAtEucO340SJ8Pm4G3rBL88w6Io",
  authDomain: "freebay-35764.firebaseapp.com",
  databaseURL: "https://freebay-35764-default-rtdb.firebaseio.com",
  projectId: "freebay-35764",
  storageBucket: "freebay-35764.firebasestorage.app",
  messagingSenderId: "1005479645367",
  appId: "1:1005479645367:web:392b283ae702ef6c7fbd32",
  measurementId: "G-NPTH4T85M0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// ==== Signup Function using Firebase Authentication ====
function registerUser() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  const status = document.getElementById('signup-status');

  if (!name || !email || !password || !confirmPassword) {
    status.textContent = "Please fill in all fields!";
    status.style.color = "#d32f2f";
    return false;
  }
  if (password !== confirmPassword) {
    status.textContent = "Passwords do not match!";
    status.style.color = "#d32f2f";
    return false;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update displayName
      return userCredential.user.updateProfile({ displayName: name }).then(() => userCredential);
    })
    .then(() => {
      status.textContent = "Signup successful! You can now sign in.";
      status.style.color = "#388e3c";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    })
    .catch((error) => {
      status.textContent = "Signup failed: " + error.message;
      status.style.color = "#d32f2f";
    });

  return false; // Prevent default form submission
}

// Password visibility toggle for signup page
function toggleSignupPassword() {
  const passwordField = document.getElementById("signup-password");
  const toggleBtn = document.getElementById("toggleSignupPasswordBtn");
  const eyeIcon = document.getElementById("signupEyeIcon");
  const isPassword = passwordField.type === "password";

  passwordField.type = isPassword ? "text" : "password";

  // Change SVG icon
  if (isPassword) {
    // Eye with line through it (password visible)
    eyeIcon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-5.94M1 1l22 22" />
      </svg>
    `;
    toggleBtn.setAttribute("aria-label", "Hide password");
  } else {
    // Regular eye (password hidden)
    eyeIcon.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    `;
    toggleBtn.setAttribute("aria-label", "Show password");
  }
}
