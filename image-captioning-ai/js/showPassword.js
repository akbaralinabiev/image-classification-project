document.addEventListener("DOMContentLoaded", function () {
  // JavaScript to toggle password visibility for password field
  const togglePassword1 = document.getElementById("toggle-password");
  const passwordInput1 = document.getElementById("password");

  togglePassword1.addEventListener("click", function () {
    const type =
      passwordInput1.getAttribute("type") === "password" ? "text" : "password";
    passwordInput1.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<img src="../assets/eye.svg" alt="Show Password">'
        : '<img src="../assets/eye-closed.svg" alt="Hide Password">';
  });

  // JavaScript to toggle password visibility for confirmPassword field
  const togglePassword2 = document.getElementById("toggle-password2");
  const passwordInput2 = document.getElementById("confirmPassword");

  togglePassword2.addEventListener("click", function () {
    const type =
      passwordInput2.getAttribute("type") === "password" ? "text" : "password";
    passwordInput2.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<img src="../assets/eye.svg" alt="Show Password">'
        : '<img src="../assets/eye-closed.svg" alt="Hide Password">';
  });
});
