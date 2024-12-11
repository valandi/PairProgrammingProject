// Grab references to DOM elements
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.querySelector(".todo-list");

// Function to create a new task
function addTask() {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new <li> and delete button
  const li = document.createElement("li");
  const taskSpan = document.createElement("span"); // Span for task text
  taskSpan.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // Add event listener for completing tasks
  li.addEventListener("click", (e) => {
    // Prevent triggering complete on clicks inside the edit input
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
    li.classList.toggle("completed");
  });

  // Add event listener for editing tasks
  taskSpan.addEventListener("dblclick", () => {
    editTask(taskSpan);
  });

  // Add event listener for deleting tasks
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Assemble the <li> and append to the list
  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  // Clear the input field
  input.value = "";
}

// Function to enable editing
function editTask(taskSpan) {
  const currentText = taskSpan.textContent;

  // Replace span with an input field for editing
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentText;
  taskSpan.replaceWith(editInput);

  // Focus on the input field
  editInput.focus();

  // Save changes on blur (when clicking outside) or pressing "Enter"
  const saveEdit = () => {
    const newText = editInput.value.trim();
    const newSpan = document.createElement("span");
    newSpan.textContent = newText === "" ? currentText : newText; // Revert to original if empty

    // Reattach editing functionality
    newSpan.addEventListener("dblclick", () => {
      editTask(newSpan);
    });

    editInput.replaceWith(newSpan);
  };

  editInput.addEventListener("blur", saveEdit); // Save on blur
  editInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  });
}

// Add event listener to "Add" button
addButton.addEventListener("click", addTask);

// Optional: Allow pressing "Enter" to add a task
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
