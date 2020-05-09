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

let noteForm = document.querySelector("#note-form");
let notes = document.querySelector(".notes");

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const noteTextInput = document.querySelector("#note-text");
  const noteTitleInput = document.querySelector("#note-title");
  const noteText = noteTextInput.value;
  const noteTitle = noteTitleInput.value;
  noteTextInput.value = "";
  createNewNote(noteText, noteTitle);
  //   renderNote();
});

function createNewNote(noteText, noteTitle) {
  fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id(),
      title: noteTitle,
      body: noteText,
      created: moment().format(),
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => renderNote());
}

function renderNotes() {
  fetch("http://localhost:3000/notes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((notes) => {
      // for (d of data)
      for (note of notes) {
        return note;
      }
    });
}

// .then(function (data) {
//   console.log(data)
//   let list = document.createElement("ul")
//   list.id = "item-list"
//   for (let item of data) {
//   }
// });

renderNotes();
