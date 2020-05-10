// Gernerates a unique id
// https://stackoverflow.com/questions/36884815/how-to-generate-unique-id-in-javascript
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

function clearInputs() {
  return (noteDescInput.value = ""), (noteTitleInput.value = "");
}

// note form
let noteForm = document.getElementById("note-form");

// notes list
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
  console.log(noteTitle, noteDesc);
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

function renderNotes() {
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
        // wrap elements in div and give class of note
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";
        noteDiv.appendChild(title);
        noteDiv.appendChild(body);
        noteDiv.appendChild(date);
        // insert note div into note-list-container
        notesContainer.appendChild(noteDiv);
      }
    });
}

renderNotes();
