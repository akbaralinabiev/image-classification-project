function copyText() {
  // Get the description element
  const descriptionElement = document.getElementById("imageDescription");

  // Get the text content of the description
  const textToCopy = descriptionElement.textContent.trim();

  // Check if the description is not empty
  if (textToCopy !== "") {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    const copyButton = document.getElementById("copyButton");
    copyButton.textContent = "Text Copied!";

    setTimeout(function () {
      copyButton.textContent = "copy text";
    }, 2000);
  }
}
