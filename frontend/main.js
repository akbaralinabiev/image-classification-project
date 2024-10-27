function previewImage(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  const imagePreview = document.getElementById("imagePreview");
  const imageInfo = document.getElementById("image-info");

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Create and display the image
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview-image");
      imagePreview.innerHTML = ""; // Clear previous previews
      imagePreview.appendChild(img);

      // Update image information
      const fileInfo = `
        <p>Filename: ${file.name}</p>
        <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
        <p>Type: ${file.type}</p>
      `;
      imageInfo.innerHTML = fileInfo;
    };

    reader.readAsDataURL(file);
  } else {
    // Clear preview and info if no file is selected
    imagePreview.innerHTML = "";
    imageInfo.innerHTML = "";
  }
}

// Clear image preview and info
function clearImage() {
  const imagePreview = document.getElementById("imagePreview");
  const imageInfo = document.getElementById("image-info");

  // Clear image preview and info
  imagePreview.innerHTML = "";
  imageInfo.innerHTML = "";
  // Clear file input
  document.getElementById("fileInput").value = "";
  document.getElementById("imageDescription").textContent =
    "Description will appear here...";
}
