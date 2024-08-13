document.addEventListener("DOMContentLoaded", loadTasks);

function newElement() {
  var taskDOM = document.getElementById("task");
  if (taskDOM.value !== "") {
    addTaskToList(taskDOM.value);
    saveTaskToLocalStorage(taskDOM.value);

    var toastEl = document.getElementById("liveToast");
    var toast = new bootstrap.Toast(toastEl);
    toast.show();

    taskDOM.value = "";
    return;
  }

  var toastEl = document.getElementById("liveToastError");
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function addTaskToList(task) {
  var liDOM = document.createElement("li");
  liDOM.className =
    "list-group-item d-flex justify-content-between align-items-center";
  liDOM.innerText = task;

  var deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.innerText = "Sil";
  deleteBtn.onclick = function () {
    this.parentElement.remove();
    removeTaskFromLocalStorage(task);
  };

  liDOM.appendChild(deleteBtn);

  var listDOM = document.getElementById("list");
  listDOM.appendChild(liDOM);
}

function saveTaskToLocalStorage(task) {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks.forEach(function (task) {
    addTaskToList(task);
  });
}

function removeTaskFromLocalStorage(task) {
  let tasks = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  tasks = tasks.filter(function (t) {
    return t !== task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
