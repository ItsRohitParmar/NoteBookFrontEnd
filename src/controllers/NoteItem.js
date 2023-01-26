import React,{useContext} from 'react'
import noteContext from '../context/Notes/noteContext';
function NoteItem(props) {
  
  const {deleteNote} = useContext(noteContext);
  const {note, onEdit, onDeleteSet, setLoading} = props

  const onDeleteClick = (note)=>{
    deleteNote({_id:note._id,showAlert:props.showAlert, setLoading});
    onDeleteSet({ _id: "", title: "", tag: "", description: "" })
  }

  return (
    <>
    {/* <div className='col-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className='d-flex align-items-baseline'>
            <h5 className="card-title">{note.title}</h5>
            
          </div>
          <p className="card-text">{note.description}</p>
          <div><i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{onEdit((note))}}></i>
            <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{onDeleteClick(note)}}></i></div>
        </div>
      </div>
    </div> */}



    <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{onEdit((note))}}></i>
    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{onDeleteClick(note)}}></i></div>
 
  </div>

</>


  )
}

export default NoteItem