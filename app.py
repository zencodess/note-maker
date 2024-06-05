from flask import Flask, request, jsonify, render_template
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

app = Flask(__name__)

# Configuration
DATABASE_URL = 'sqlite:///notes.db'
Base = declarative_base()
engine = create_engine(DATABASE_URL)
Session = scoped_session(sessionmaker(bind=engine))

# Model
class Note(Base):
    __tablename__ = 'notes'
    id = Column(Integer, primary_key=True)
    content = Column(String(200), nullable=False)

# Create tables
Base.metadata.create_all(engine)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes', methods=['GET', 'POST'])
def handle_notes():
    session = Session()
    if request.method == 'POST':
        data = request.get_json()
        new_note = Note(content=data['content'])
        session.add(new_note)
        session.commit()
        session.close()
        return jsonify({'id': new_note.id, 'content': new_note.content})

    notes = session.query(Note).all()
    session.close()
    return jsonify([{'id': note.id, 'content': note.content} for note in notes])

@app.route('/notes/<int:note_id>', methods=['PUT', 'DELETE'])
def handle_note(note_id):
    session = Session()
    note = session.query(Note).get(note_id)
    if not note:
        session.close()
        return jsonify({'error': 'Note not found'}), 404

    if request.method == 'PUT':
        data = request.get_json()
        note.content = data['content']
        session.commit()
        session.close()
        return jsonify({'id': note.id, 'content': note.content})

    if request.method == 'DELETE':
        session.delete(note)
        session.commit()
        session.close()
        return jsonify({'message': 'Note deleted'})

if __name__ == '__main__':
    app.run(debug=True)
