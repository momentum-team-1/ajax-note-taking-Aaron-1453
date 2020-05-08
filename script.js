let noteForm = document.querySelector("#note-form");
let notes = document.querySelector(".notes");

noteForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let noteTextInput = document.querySelector("#note-text");
  let noteText = noteTextInput.value;
  noteTextInput.value = "";
  createNewNote(noteText);
});

function createNewNote(noteText) {
  fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      item: noteText,
      created: moment().format(),
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then(() => renderNote());
}

function renderNote(noteList) {
  noteList.innerHTML = "";
  fetch("http://localhost:3000/notes", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let list = document.createElement("ul");
      list.id = "item-list";
      for (let item of data) {
      }
    });
}

renderNote();
