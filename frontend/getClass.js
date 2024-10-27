document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("generateCaptionBtn")
    .addEventListener("click", function () {
      var fileInput = document.getElementById("fileInput");
      var file = fileInput.files[0];
      var formData = new FormData();
      formData.append("image", file);

      // Show the percentage counter and reset it to 0%
      document.getElementById("percentageCounter").style.display = "block";
      document.getElementById("percentageCounter").textContent = "0%";

      fetch("http://127.0.0.1:5000/classify", {
        // Update to /classify
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          // Display the predicted class
          document.getElementById("imageDescription").textContent =
            data.predicted_class || "Class not predicted"; // Update this line
          // Hide the percentage counter
          document.getElementById("percentageCounter").style.display = "none";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});

function getCaption() {
  // Replace placeholder with percentage counter
  document.getElementById("percentageCounter").textContent = "0%"; // Start with 0%
  let count = 1;
  const interval = setInterval(() => {
    document.getElementById("percentageCounter").textContent = count + "%"; // Update percentage counter
    count++;
    if (count > 100) {
      clearInterval(interval);
      // Send request to server to get caption
      fetch("http://127.0.0.1:5000/classify", {
        // Update to /classify
        method: "POST",
        body: JSON.stringify({ imageData: "your_image_data" }), // You can keep this if you want to add more functionality
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set the predicted class
          setCaption(data.predicted_class || "Class not predicted"); // Update this line
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, 50); // Change the interval as needed
}
