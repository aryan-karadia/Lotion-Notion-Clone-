import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteView = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    
    useEffect(() => {
        setNote(localStorage.getItem(`${id}`));
        setContent(JSON.parse(localStorage.getItem(`${id}`)).content);
        }, [id]);

    
    return (
        <div>
        {note && (
            <div >
            <span id="content-header">
                <h1>{note.title}</h1>
                <p>{note.when}</p>
                <span>
                    <span className="save-btn">Edit</span>
                    <span className="del-btn">Delete</span>
                </span>
            </span>
            <ReactQuill className="editor" placeholder="Your Note Here" value={content} onChange={setContent} readOnly={true} />

        </div>
        )}
        </div>
    );
};

export default NoteView;