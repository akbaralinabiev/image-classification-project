// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBZjC5M5-CrhIDOtTwXk6_gCeDtCuqI1Bo",
//   authDomain: "image-captioning-ai.firebaseapp.com",
//   projectId: "image-captioning-ai",
//   storageBucket: "image-captioning-ai.appspot.com",
//   messagingSenderId: "1084117154398",
//   appId: "1:1084117154398:web:78a82a2642bc654d0712cf",
//   measurementId: "G-VBFNK5E19W",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



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

document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Success! Account created.");
        showToast("Success! Account created.");

        // Store user email in localStorage
        localStorage.setItem("userEmail", user.email);

        // Optionally, you can update the user's display name
        user
          .updateProfile({
            displayName: fullname,
          })
          .then(() => {
            // Update successful
            // Redirect to home.html after successful sign up
            window.location.href = "../home.html";
          })
          .catch((error) => {
            // An error occurred
            console.error("Error updating display name:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error occurred. Try again.", errorCode, errorMessage);
        // Display custom error message for email already exists
        if (errorCode === "auth/email-already-in-use") {
          showToast("Email already in use.", true);
        } else {
          showToast(errorMessage, true);
        }
      });
  });

