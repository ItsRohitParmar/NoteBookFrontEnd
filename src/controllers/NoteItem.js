import React,{useContext} from 'react'
import noteContext from '../context/Notes/noteContext';
function NoteItem(props) {
  
  const {deleteNote} = useContext(noteContext);
  const {note, onEdit, onDeleteSet} = props

  const onDeleteClick = (note)=>{
    deleteNote({_id:note._id,showAlert:props.showAlert});
    onDeleteSet({ _id: "", title: "", tag: "", description: "" })
  }

  return (
    <div className='col-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className='d-flex align-items-baseline'>
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{onEdit((note))}}></i>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{onDeleteClick(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem