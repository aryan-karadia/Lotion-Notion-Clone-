import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css';



const NoteView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({id: `${id}`, Title: "", Content: "", when: ""});
    const [content, setContent] = useState("");
    
    useEffect(() => {
        const curNote = JSON.parse(localStorage.getItem(`${id}`));
        setNote({...note, 
            Title: curNote.Title,
            Content: curNote.Content,
            when: curNote.when
        })
        setContent(curNote.Content);
        console.log(note);
        console.log(content);
        const curNoteTitle = document.querySelector(`#note-${id}`);
        curNoteTitle.classList.add("active");
        }, []);

    const editNote = () => {
        navigate(`/Notes/${id}/edit`);
    }

    const Del = () => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
        deleteNote(id);
        }
    }

    const deleteNote = (id) => {
        localStorage.removeItem(`${id}`);
        const curNote = document.querySelector(`#note-${id}`);
        curNote.remove();
        navigate("/Notes");
    }

    return (
        <div id="body">
        {note && (
            <div>
            <span id="note-header">
                <div>
                    <h1 className="view-title">{JSON.parse(localStorage.getItem(`${id}`)).Title}</h1>
                    <p style={{color: "var(--secondary-color)"}} >{JSON.parse(localStorage.getItem(`${id}`)).when}</p>
                </div>
                <span>
                    <span className="save-btn" onClick={editNote}>Edit</span>
                    <span className="del-btn" onClick={Del}>Delete</span>
                </span>
            </span>
            <ReactQuill className="editor" value={content} readOnly={true} theme={"bubble"} />

        </div>
        )}
        </div>
    );
};

export default NoteView;