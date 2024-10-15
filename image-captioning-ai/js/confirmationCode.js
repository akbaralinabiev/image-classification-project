document.addEventListener("DOMContentLoaded", function () {
  // Get the email address from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  // Display the email address in the confirmation message
  const emailSpan = document.getElementById("emailSpan");
  if (emailSpan) {
    emailSpan.textContent = email;
  } else {
    console.error("Element with ID 'emailSpan' not found.");
  }
});
