import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";



const NoteView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({});
    const [content, setContent] = useState("");
    
    useEffect(() => {
        setNote(localStorage.getItem(`${id}`));
        setContent(JSON.parse(localStorage.getItem(`${id}`)).content);
        }, [id]);

    const editNote = () => {
        navigate(`/Notes/${id}/edit`);
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
                    <span className="del-btn">Delete</span>
                </span>
            </span>
            <p>{content}</p>

        </div>
        )}
        </div>
    );
};

export default NoteView;