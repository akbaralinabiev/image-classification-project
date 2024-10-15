// Function to display toast message
function showToast(message, isError = false) {
  const toastContainer = document.getElementById("toastMessage");
  toastContainer.innerText = message;
  toastContainer.classList.add("show");
  toastContainer.style.marginTop = "5px";

  // Set color based on whether it's an error message or not
  if (isError) {
    toastContainer.style.color = "#CF4A4A";
  } else {
    toastContainer.style.color = "#59B210";
  }

  setTimeout(() => {
    toastContainer.classList.remove("show");
  }, 3000); // Hide after 3 seconds
}

// Create an instance of Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZjC5M5-CrhIDOtTwXk6_gCeDtCuqI1Bo",
  authDomain: "image-captioning-ai.firebaseapp.com",
  projectId: "image-captioning-ai",
  storageBucket: "image-captioning-ai.appspot.com",
  messagingSenderId: "1084117154398",
  appId: "1:1084117154398:web:78a82a2642bc654d0712cf",
  measurementId: "G-VBFNK5E19W",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


document.getElementById("loginButton").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Success! Logged in.");
      showToast("Success! Logged in.");

      // Store user email in localStorage
      localStorage.setItem("userEmail", user.email);

      // Redirect to home.html after successful login
      window.location.href = "../home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error occurred. Try again.", errorCode, errorMessage);
      // Display custom error message based on error code
      if (errorCode === "auth/invalid-login-credentials") {
        showToast("The email or password you entered is incorrect.", true);
      } else {
        showToast(errorMessage, true);
      }
    });
});


