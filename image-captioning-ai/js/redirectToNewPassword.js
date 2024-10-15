//script to check if the entered code is correct then redirect to the set new password page
document.addEventListener("DOMContentLoaded", function () {
  // JavaScript code here
  document.getElementById("confirmBtn").addEventListener("click", () => {
    // Perform code verification here (check if the entered code is correct)

    // Assuming the code verification is successful, redirect to the set new password page
    window.location.href = "newPassword.html";
  });
});
