import NoteContext from "./noteContext";

import { useState } from "react";


const NoteState = (props) => {

  const auth_token = localStorage.getItem('auth_token');

  const [notes, setNote] = useState([]);

  //---------------------------------------- Add a New Note ------------------------------------------
  // eslint-disable-next-line
  const addNewNote = async ({ title, tag, description, showAlert, setLoading }) => {
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

    try {
      setLoading(true);
    // eslint-disable-next-line
    const response = await fetch(`https://note-book-mauve.vercel.app/api/notes/createNote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      },
      body: JSON.stringify({ title, tag, description })
    })
    setNote(notes.concat(note));

    viewNotes({showAlert, setLoading});
    setLoading(false);
    showAlert("success", "New Note Added Successfully")
  } catch (error) {
    console.log(error);
   showAlert("danger", "Internal Server Error")
}
  }

  //------------------------------- Edit an Existing Note ----------------------------------------------
  // eslint-disable-next-line
  const editNote = async (props) => {
    const auth_token = localStorage.getItem('auth_token');

    const { _id, title, tag, description,showAlert } = props;

    try {
      props.setLoading(true);
    const response = await fetch(`https://note-book-mauve.vercel.app/api/notes/updateNote/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      },
      body: JSON.stringify({ title, tag, description })
    })

    const json = await response.json();
    console.log(json);
    
    viewNotes({showAlert, setLoading: props.setLoading});
    props.setLoading(false);
    props.showAlert("success", "Note Edited Successfully")
  } catch (error) {
    console.log(error);
   showAlert("danger", "Internal Server Error")
}

  }
  // -------------------------------------- View All Notes -----------------------------------------
  // eslint-disable-next-line
  const viewNotes = async (props) => {
     
    try{
    const auth_token = localStorage.getItem('auth_token');
    props.setLoading(true);
    const response = await fetch('https://note-book-mauve.vercel.app/api/notes/getallnotes', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      }
    })

    const json = await response.json();
    console.log(json);
    props.setLoading(false);
    setNote(json.note);
  } catch (error) {
    console.log(error); 
   props.showAlert("danger", "Internal Server Error")
}

  }
  //------------------------------------ Delete a Note -------------------------------------------
  // eslint-disable-next-line
  const deleteNote = async (props) => {
    let { _id, showAlert } = props;
    const auth_token = localStorage.getItem('auth_token');
    console.log("Deleting note with id:" + _id);
    //Replacing bellow 2 line code with viewNotes() function at line no 83;
    // var remainingNotes = notes.filter((item) =>{return item._id !== _id});
    // setNote(remainingNotes);
    try {
      
    const response = await fetch(`https://note-book-mauve.vercel.app/api/notes/deleteNote/${_id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'auth_token': auth_token
      }
    })
    const json = await response.json();
    console.log(json);
    viewNotes({showAlert, setLoading: props.setLoading});
    showAlert("success", "Note Deleted Successfully")
  } catch (error) {
      console.log(error);
     showAlert("danger", "Internal Server Error")
  }
  }
  

  return (
    <NoteContext.Provider value={{ notes, setNote, addNewNote, editNote, viewNotes, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;
