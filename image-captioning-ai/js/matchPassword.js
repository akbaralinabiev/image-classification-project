document
  .getElementById("savePasswordBtn")
  .addEventListener("click", (event) => {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      // Check if flash message already exists
      const existingFlashMessage = document.querySelector(".flash-message");
      if (!existingFlashMessage) {
        // Create flash message element
        const flashMessage = document.createElement("div");
        flashMessage.classList.add("flash-message");
        flashMessage.textContent = "Passwords don't match. Please try again.";

        // Add margin-top to the flash message
        flashMessage.style.marginTop = "5px";
        flashMessage.style.color = "#CF4A4A";

        // Get the parent container with the class flash_form
        const flashForm = document.querySelector(".form_item_pass");
        flashForm.appendChild(flashMessage);
      }

      // Prevent form submission and page reload
      event.preventDefault();
      return false;
    }
    window.location.href = "../home.html";
  });

// Remove flash message when user starts typing in password fields
document.getElementById("password").addEventListener("input", () => {
  const existingFlashMessage = document.querySelector(".flash-message");
  if (existingFlashMessage) {
    existingFlashMessage.remove();
  }
});

document.getElementById("confirmPassword").addEventListener("input", () => {
  const existingFlashMessage = document.querySelector(".flash-message");
  if (existingFlashMessage) {
    existingFlashMessage.remove();
  }
});
