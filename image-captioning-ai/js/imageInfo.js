function previewImage(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];
  const imagePreview = document.getElementById("imagePreview");
  const imageInfo = document.getElementById("image-info");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview-image");
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      updateImageInfo(file);
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = "";
    imageInfo.innerHTML = "";
  }
}

function updateImageInfo(file) {
  const imageInfo = document.getElementById("image-info");
  const fileInfo = `
        <p>Filename: ${file.name}</p>
        <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
        <p>Type: ${file.type}</p>
    `;
  imageInfo.innerHTML = fileInfo;
}
