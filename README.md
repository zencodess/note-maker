## Features
A personal note taking web app with a decent UI, and support for 
 - Adding new notes,
 - Viewing notes list we have so far,
 - Storing all the notes in database,
 - Modify or Delete existing notes
## Run Locally
 - You can clone the repo using `git clone https://github.com/zencodess/note-maker.git`
 - `cd note-maker`
 - `pip3 install requirements.txt`
 - `python3 run app.py`
 -  Open http://127.0.0.1:5000/ on browser (eg: Chrome)

You will see Note Maker app running. 
eg: Refer to this ![picture](https://github.com/zencodess/note-maker/blob/main/img/NoteMaker_v1.png), to check my app 

## Code Overview
![UML Diagram](https://github.com/zencodess/note-maker/blob/main/img/NoteMaker_UML_v1.png)
### Backend (app.py)
This app.py file sets up the note-taking web application using Flask for the backend and SQLAlchemy for database interactions.
#### Database configuration
- Database URL: Specifies the database's location. Here, SQLite.
- Engine: The SQLAlchemy engine that manages connections to the database.
#### ORM Model
Note Class: This defines the Note table in the database.
- `__tablename__`: The name of the table.
- `id`: A column for the primary key.
- `content`: A column for the note's content.
#### Routes
- `/` : Renders the home page (index.html)
- `/notes` : Handles both GET and POST requests.
  - POST: Adds a new note to the database, after parsing the request. Returns the newly created note as JSON.
  - GET: Retrieves all notes from the database. Returns the notes as JSON.
- `/notes/<int:note_id>` : Handles PUT and DELETE requests for a specific note by its ID.
  - PUT: Updates an existing note. Returns the updated note as JSON.
  - DELETE: Deletes an existing note. Returns a deletion confirmation message.

#### SQLite DB 
[Notes will be stored in DB](https://github.com/zencodess/note-maker/blob/main/img/sqlite_db_v1.png)

### Frontend (static/scripts.js)
The frontend handles the user interface and interactions, including loading, adding, editing, and deleting notes.

Class: NoteController
- File: static/scripts.js
- Description: Manages the collection of notes and provides methods to load, add, edit, delete, and save notes.
- Methods:
  - loadNotes(): Loads notes from the backend.
  - addNote(): Adds a new note.
  - editNote(): Edits an existing note.
  - deleteNote(): Deletes a note.
  - saveNote(): Saves changes to a note.
