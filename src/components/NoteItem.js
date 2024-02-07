import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext"


const NoteItem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote} = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title">{notes.title}</h5>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(notes._id); props.showAlert("Deleted succesfully", "success")}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updateNote(notes)}}></i>
          </div>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
