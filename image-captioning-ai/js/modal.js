var modal = document.getElementById("modal");

var imgPreview = document.getElementById("imagePreview");
var modalImg = document.getElementById("modalImage");

modal.style.display = "none";

function displayModal() {
  modal.style.display = "block";
  modalImg.src = imgPreview.querySelector("img").src;
}

if (imgPreview.querySelector("img").src) {
  imgPreview.onclick = displayModal;
} else {
  imgPreview.onclick = null;
}

var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
