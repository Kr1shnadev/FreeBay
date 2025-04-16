// Toggle password visibility
function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePasswordBtn");
  const eyeIcon = document.getElementById("eyeIcon");
  const isPassword = passwordField.type === "password";
  
  // Toggle password type
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

// ==== Firebase Config & Initialization ====
// TODO: Replace the below config with your Firebase project config
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ==== Login Function using Firebase Authentication ====
function validateLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === "" || password === "") {
    alert("Please fill in both fields!");
    return false;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      alert('Login successful! Welcome to FreeBay.');
      // Redirect to browse.html
      window.location.href = 'browse.html';
    })
    .catch((error) => {
      alert('Login failed: ' + error.message);
    });

  return false; // Prevent default form submission
}