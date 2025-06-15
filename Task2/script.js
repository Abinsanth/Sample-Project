function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.innerHTML = `${task} <button onclick="this.parentElement.remove()">Remove</button>`;
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}


function addImageFromDevice() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = "Uploaded image";
    img.style.maxWidth = "100%";
    img.style.marginTop = "10px";
    document.getElementById("galleryContainer").appendChild(img);
  };
  reader.readAsDataURL(file);
  fileInput.value = "";
}


function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const error = document.getElementById("error");

  if (!name || !email || !message) {
    error.textContent = "All fields are required.";
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    error.textContent = "Please enter a valid email address.";
    return false;
  }

  if (message.length < 20) {
    error.textContent = "Message should be at least 20 characters.";
    return false;
  }

  error.textContent = "";
  alert("Form submitted successfully!");
  return true;
}
