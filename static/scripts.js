document.addEventListener('DOMContentLoaded', function() {
    loadNotes();

    document.getElementById('addNoteBtn').addEventListener('click', function() {
        addNote();
    });
});

function loadNotes() {
    fetch('/notes')
        .then(response => response.json())
        .then(data => {
            data.forEach(note => addNoteToDOM(note));
        });
}

function addNote() {
    const noteElement = createNoteElement({ id: null, content: '' });
    document.getElementById('notesContainer').appendChild(noteElement);
    noteElement.querySelector('textarea').focus();
}

function addNoteToDOM(note) {
    const noteElement = createNoteElement(note);
    document.getElementById('notesContainer').appendChild(noteElement);
}

function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.className = 'note';
    noteElement.dataset.id = note.id;

    const noteContent = document.createElement('textarea');
    noteContent.value = note.content;
    noteContent.maxLength = 300;
    noteContent.rows = 5;
    noteContent.placeholder = 'Enter your note here...';
    noteElement.appendChild(noteContent);

    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.textContent = `${note.content.length}/300`;
    noteElement.appendChild(charCounter);

    noteContent.addEventListener('input', function() {
        charCounter.textContent = `${noteContent.value.length}/300`;
    });

    const saveBtn = document.createElement('button');
    saveBtn.className = 'save';
    saveBtn.innerHTML = '&#10004;'; // Save symbol
    saveBtn.addEventListener('click', function() {
        saveNote(noteElement);
    });
    noteElement.appendChild(saveBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = '&#128465;'; // Delete symbol
    deleteBtn.addEventListener('click', function() {
        deleteNote(noteElement);
    });
    noteElement.appendChild(deleteBtn);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&#10006;'; // Close symbol
    closeBtn.addEventListener('click', function() {
        noteElement.remove();
    });
    noteElement.appendChild(closeBtn);

    return noteElement;
}

function saveNote(noteElement) {
    const noteContent = noteElement.querySelector('textarea').value;
    const noteId = noteElement.dataset.id;

    if (!noteId) {
        // New note
        fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContent }),
        })
        .then(response => response.json())
        .then(data => {
            noteElement.dataset.id = data.id;
        });
    } else {
        // Existing note
        fetch(`/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContent }),
        })
        .then(response => response.json())
        .then(data => {
            noteElement.querySelector('textarea').value = data.content;
        });
    }
}

function deleteNote(noteElement) {
    const noteId = noteElement.dataset.id;

    if (noteId) {
        fetch(`/notes/${noteId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(() => {
            noteElement.remove();
        });
    } else {
        noteElement.remove();
    }
}
