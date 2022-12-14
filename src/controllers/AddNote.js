import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/Notes/noteContext'

function AddNote(props) {

  const context = useContext(noteContext);
  const { addNewNote } = context;
  

  const [newNote, setNewNote] = useState({_id:"", user:"", title: "", tag: "", description: "" })

  const handleSubmit = (s) => {
    s.preventDefault();
    addNewNote({ title: newNote.title, tag: newNote.tag, description: newNote.description });

  }

  const handleOnChange = (a) => {
    setNewNote({ ...newNote, [a.target.name]: a.target.value })
  }

  const [display, setDisplay] = useState("none")


  const displayForm = () => {
    if (display === 'block')
      setDisplay("none")
    else
      setDisplay("block");
  }
  return (
    <div className='container my-4'>
      <h2> Add a new note <i class="mx-4 fa-sharp fa-solid fa-plus" onClick={displayForm}></i></h2>

      <form className={`d-${display === 'none' ? "none" : "block"}`}>
        <div className="mb-3">
          <label htmlFor="Title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" onChange={handleOnChange} placeholder='Enter title here...' value={newNote.title} />
          <label htmlFor="Tag" className="form-label">Tag</label>
          <input type="text" className="form-control" name='tag' id="tag" onChange={handleOnChange} placeholder='Enter tag here...' value={newNote.tag} />
        </div>
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">Example textarea</label>
          <textarea className="form-control" name='description' id="description" value={newNote.description} onChange={handleOnChange} placeholder='Enter decription here...' rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={newNote.title.length < 5 || newNote.description.length < 5} onClick={handleSubmit}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote