function uploadImage(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("uploads", file);

    fetch("http://127.0.0.1:5000/classify", {
      // Adjust this URL if needed
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Optionally display the classification result
        alert("Predicted class: " + data.predicted_class);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error uploading image: " + error);
      });
  }
}
