// Function to check if the user still exists
function checkUserExistence() {
  // Check if user email is stored in localStorage
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    // Hide login and register buttons
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("registerLink").style.display = "none";
    document.getElementById("logoutButton").style.display = "none";

    // Display user email
    document.getElementById("userEmailDisplay").innerText = userEmail;
    document.getElementById("userEmailDisplay").style.display = "block";
    document.getElementById("logoutButton").style.display = "block";
  } else {
    console.log("No user email found in localStorage");
  }
}

// Add event listener to check user existence when DOM content is loaded
document.addEventListener("DOMContentLoaded", checkUserExistence);
