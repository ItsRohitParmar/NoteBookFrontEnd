import React, { useContext, useState, useEffect, Fragment } from 'react'
import noteContext from '../context/Notes/noteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
import "./NoteContainer.css"
import Loader from "../controllers/Loader/Loader";
function Notes(props) {
  const context = useContext(noteContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // eslint-disable-next-line
  const { notes, addNewNote, editNote, viewNotes } = context;

  const [newNote, setNewNote] = useState({ _id: "", title: "", tag: "", description: "" })

  const onEdit = (note) => {
    setNewNote({
      _id: note._id,
      title: note.title,
      tag: note.tag, 
      description: note.description
    })

    displayForm();
  }

  //--------------------------- On Edit Note/Add Note form submission --------------------------------  
  const handleSubmit = (s) => {
    s.preventDefault();
    if (newNote._id === "") {
      addNewNote({ title: newNote.title, tag: newNote.tag, description: newNote.description, showAlert: props.showAlert, setLoading });
      // after adding new note removing text from form
      setNewNote({ _id: "", title: "", tag: "", description: "" })
    }
    else {
      editNote({ _id: newNote._id, title: newNote.title, tag: newNote.tag, description: newNote.description, showAlert: props.showAlert, setLoading })
      // after adding new note removing text from form
      setNewNote({ _id: "", title: "", tag: "", description: "" })
    }
    displayForm();
  }

  //On changing the text in edit/add note
  const handleOnChange = (a) => {
    setNewNote({ ...newNote, [a.target.name]: a.target.value })
  }

  // State to track the add/edit Note form display state
  const [display, setDisplay] = useState("none")

  // ----------------------- Function to display and hide the add/edit note form ---------------
  const displayForm = () => {
    if (display === 'block') {
      setDisplay("none");
      setNewNote({ _id: "", title: "", tag: "", description: "" })
    }
    else
      setDisplay("block");
  }


// eslint-disable-next-line
  useEffect(() => {
    if(localStorage.getItem('auth_token')) 
    {
      viewNotes({showAlert:props.showAlert , setLoading}); 
      // eslint-disable-next-line
      setNewNote({ _id: "", title: "", tag: "", description: "" })
    }
    else{
      // eslint-disable-next-line
      navigate('/login');
    }
// eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {loading ? <Loader/> :
      <Fragment>
        <div className='container my-3' style={{'paddingTop':'0px'}}>
        <h2> Add a new note <i className="mx-4 fa-sharp fa-solid fa-plus" style={{color:"#1c74f6"}} id="plus" onClick={displayForm}></i></h2>

        <form className={`d-${display === 'none' ? "none" : "block"} `}>
          <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control" required name="title" id="title" onChange={handleOnChange} placeholder='Enter title here of minimum 5 length...' value={newNote.title} />
            <label htmlFor="Tag" className="form-label my-1">Tag</label>
            <input type="text" className="form-control my-1" required name='tag' id="tag" onChange={handleOnChange} placeholder='Enter tag here...' value={newNote.tag} />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea className="form-control" required name='description' id="description" value={newNote.description} onChange={handleOnChange} placeholder='Enter description here of minimum 5 length...' rows="3"></textarea>
          </div>
          <button type="submit" disabled={newNote.title.length<5 || newNote.description.length<5} className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
      </div>


      {/* This is to display the notes*/}
      <div className='row'>
        <div className='container mx-2'>
        <h2>Your Notes</h2>
        {notes.length === 0 && "No notes to display"}
        </div>
        </div>
        <div className="noteContainer">
        {notes.map((note) => {
          return <NoteItem key={note._id} onEdit={onEdit} setLoading={setLoading} showAlert={props.showAlert} onDeleteSet={setNewNote} note={note} />;
        })}
        </div>
      </Fragment>
      }
      
    </Fragment>
  )
}
export default Notes