import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";



const NoteView = () => {
    console.log(localStorage);
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({id: `${id}`, Title: "", Content: "", when: ""});
    const [content, setContent] = useState(localStorage.getItem(`${id}`).Content);
    
    useEffect(() => {
        setNote({...note, 
            Title: localStorage.getItem(`${id}`).Title,
            Content: localStorage.getItem(`${id}`).Content,
            when: localStorage.getItem(`${id}`).when
        })

        setContent(localStorage.getItem(`${id}`).Content);
        const curNote = document.querySelector(`#note-${id}`);
        curNote.classList.add("active");
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
            <p>{content}</p>

        </div>
        )}
        </div>
    );
};

export default NoteView;