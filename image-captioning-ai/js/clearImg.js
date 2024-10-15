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
