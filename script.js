// ** HELPER FUNCTIONS **

// https://stackoverflow.com/questions/36884815/how-to-generate-unique-id-in-javascript
// Gernerates a unique id
function id() {
  var ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ID_LENGTH = 8;
  var rtn = "";
  for (var i = 0; i < ID_LENGTH; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
}

// assign variable to note form
let noteForm = document.getElementById("note-form");
// assign variable to note list container
let notesContainer = document.getElementById("notes-list-container");

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let noteDescInput = document.getElementById("note-description");
  let noteDesc = noteDescInput.value;
  let noteTitleInput = document.getElementById("note-title");
  let noteTitle = noteTitleInput.value;
  noteDescInput.value = "";
  noteTitleInput.value = "";
  createNewNote(noteTitle, noteDesc);
});

notesContainer.addEventListener("click", function (event) {
  let target = event.target;
  if (target.matches("#delete")) {
    console.log("DELETE");
    deleteNote(target.parentElement.dataset.id);
  }
});

notesContainer.addEventListener("click", function (event) {
  let target = event.target;
  if (target.matches("#edit")) {
    console.log("EDIT");
  }
});

function createNewNote(title, body) {
  fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id(),
      title: title,
      body: body,
      created: moment().format(),
    }),
  }).then((response) => {
    return response.json();
  });
}

function deleteNote(noteId) {
  // assign varible to note div
  let noteToDelete = document.querySelector(`[data-id='${noteId}]`);
  // fetch request using delete method and pass it noteId
  fetch(`http://localhost:3000/notes/${noteId}`, { method: "DELETE" })
    // remove note div from the dom
    .then(function () {
      notesContainer.removeChild(noteToDelete);
    });
}

// Render all the notes in the notes list
function renderNotesList() {
  fetch("http://localhost:3000/notes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then(function (notes) {
      for (let note of notes) {
        // create title h4 element
        const title = document.createElement("h4");
        title.innerText = note.title;
        // create note body paragraph element
        const body = document.createElement("p");
        body.innerText = note.body;
        // create note date paragraph element
        const date = document.createElement("p");
        date.innerText = note.created;
        // create delete button using trash icon
        const deleteButton = document.createElement("span");
        deleteButton.id = "delete";
        deleteButton.classList.add("fa", "fa-trash", "mar-l-xs");
        // create edit button using pencil icon
        const editButton = document.createElement("span");
        editButton.id = "edit";
        editButton.classList.add("fa", "fa-pencil", "mar-l-xs");
        // wrap elements in div and give class of note
        const noteDiv = document.createElement("div");
        noteDiv.dataset.id = note.id;
        noteDiv.className = "note";
        noteDiv.appendChild(title);
        noteDiv.appendChild(body);
        noteDiv.appendChild(date);
        noteDiv.appendChild(deleteButton);
        noteDiv.appendChild(editButton);
        // insert note div into note-list-container
        notesContainer.appendChild(noteDiv);
      }
    });
}

renderNotesList();
