import NoteContext from "./noteContext";

import { useState } from "react";


const NoteState = (props) => {

  const auth_token = localStorage.getItem('auth_token');

  const [notes, setNote] = useState([]);

  //Add a New Note
  // eslint-disable-next-line
  const addNewNote = async ({ title, tag, description, showAlert }) => {
    console.log("adding a new note");
    const note = {
      "_id": "",
      "user": "",
      "title": "",
      "description": "",
      "tag": "General",
      "date": "",
      "__v": 0
    }

    note.title = title;
    note.tag = tag;
    note.description = description;

    setNote(notes.concat(note));

    const response = await fetch(`http://localhost:5000/api/notes/createNote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      },
      body: JSON.stringify({ title, tag, description })
    })

    viewNotes();
    showAlert("success","New Note Added Successfully")
  }

  // Edit an Existing Note
  // eslint-disable-next-line
  const editNote = async (props) => {
    const auth_token = localStorage.getItem('auth_token');

    const { _id, title, tag, description } = props;

    const response = await fetch(`http://localhost:5000/api/notes/updateNote/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      },
      body: JSON.stringify({ title, tag, description })
    })

    const json = await response.json();
    console.log(json);

    viewNotes();
    props.showAlert("success","Note Edited Successfully")

  }
  // View All Notes
  // eslint-disable-next-line
  const viewNotes = async () => {

    const auth_token = localStorage.getItem('auth_token');
    const response = await fetch('http://localhost:5000/api/notes/getallnotes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      }
    })

    const json = await response.json();
    console.log(json);

    setNote(json.note);

  }
  // Delete a Note
  // eslint-disable-next-line
  const deleteNote = async (props) => {
   let {_id, showAlert} = props;
    const auth_token = localStorage.getItem('auth_token');
    console.log("Deleting note with id:" + _id);
    //Replacing bellow 2 line code with viewNotes() function at line no 83;
    // var remainingNotes = notes.filter((item) =>{return item._id !== _id});
    // setNote(remainingNotes);

    const response = await fetch(`http://localhost:5000/api/notes/deleteNote/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      }
    })
    const json = await response.json();
    console.log(json);
    viewNotes();
    showAlert("success","Note Deleted Successfully")
  }


  return (
    <NoteContext.Provider value={{ notes, setNote, addNewNote, editNote, viewNotes, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
