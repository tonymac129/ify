document.addEventListener("DOMContentLoaded", function() {
    const note = document.querySelectorAll(".note");
    const noteContainer = document.querySelector(".note-container");
    note.forEach(function(element) {
        element.addEventListener("click", function() {
            note.forEach(function(element) {
                element.style.display = "none";
            });
            const textarea = document.createElement("textarea");
            const saveBtn = document.createElement("button");
            textarea.classList.add("textarea");
            saveBtn.classList.add("save-button");
            saveBtn.innerHTML = "Save Note";
            noteContainer.appendChild(textarea);
            noteContainer.appendChild(saveBtn);
            textarea.value = localStorage.getItem("note");
            saveBtn.addEventListener("click", saveNote);
        });
    });

    function saveNote() {
        const textarea = noteContainer.querySelector(".textarea");
        let value = textarea.value;
        localStorage.setItem("note", value);
        console.log(localStorage);
    }
});