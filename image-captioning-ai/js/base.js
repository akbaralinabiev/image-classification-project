{
  setTimeout(() => document.body.classList.add("render"), 60);
  const navdemos = Array.from(document.querySelectorAll("nav.demos > .demo"));
  const total = navdemos.length;
  const current = navdemos.findIndex((el) =>
    el.classList.contains("demo--current")
  );
  const navigate = (linkEl) => {
    document.body.classList.remove("render");
    document.body.addEventListener(
      "transitionend",
      () => (window.location = linkEl.href)
    );
  };
  navdemos.forEach((link) =>
    link.addEventListener("click", (ev) => {
      ev.preventDefault();
      navigate(ev.target);
    })
  );
}

// Redirect to the captioning.html page
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play");

  playButton.addEventListener("click", function () {
    window.location.href = "./pages/captioning.html";
  });
});


// Add event listener to the logout button
		const userEmailDisplay = document.getElementById("userEmailDisplay");
		const logoutDropdown = document.getElementById("logoutDropdown");
		const logoutButton = document.getElementById("logoutButton");

		// Add event listener to the email display
		userEmailDisplay.addEventListener("click", () => {
			// Toggle visibility of the logout dropdown
			logoutDropdown.style.display = (logoutDropdown.style.display === "block") ? "none" : "block";
		});

		// Add event listener to the logout button
		logoutButton.addEventListener("click", () => {
			// Redirect to the index file or perform sign-out operation
			window.location.href = "../index.html"; // Or your sign-out logic
		});