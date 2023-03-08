import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit = () => {
    const { id } = useParams();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };

    const setDate = (e) => {    
        let date = formatDate(e.target.value);
        setNote(note => ({
            ...note,
            when: date
        }));
    };

    const prevNote = localStorage.getItem(`${id}`);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const ChangeTitle = (e) => {
        setNote(note => ({
            ...note,
            Title :e.target.value
        }));
    };
    
    const [note, setNote] = useState({id: `${id}`, Title: "Untitled", Content: "", when: formatDate(Date.now())});
    console.log(prevNote);

    useEffect( 
        () => {
            if (prevNote) {
                console.log("useEffect evoked");
                setNote(note => ({
                    ...note,
                    Title: prevNote.Title,
                    Content: prevNote.Content,
                    when: prevNote.when
                }))
            }
        }, []);

    console.log(note);
    
    
    
    const save = () => {
        let bodyText = document.querySelector(".ql-editor").innerHTML;
        bodyText = bodyText.slice(3, bodyText.length - 4);
        console.log(bodyText);
        setNote(note => ({
            ...note,
            Content: bodyText
            }));
        localStorage.setItem(`${id}`, JSON.stringify(note));
        console.log(note);
        const noteTitle = document.querySelector(`#note-${id}`);
        noteTitle.innerHTML = `<h2>${note.Title}</h2><p style={{color: "var(--secondary-color)"}} >${note.when}</p><p>${note.Content}</p>`;
        navigate(`/`);
        navigate(`/Notes/${id}`);
    };

    
    return (
        <div id="body">
            <span id="note-header">
                <div>
                    <input type="text" defaultValue={note.Title} className="title" onChange={(e) => ChangeTitle(e)} />
                    <input className="date" type="datetime-local" defaultValue={Date.now()} onChange={(e) => setDate(e)}/>
                </div>
                <span>
                    <span className="save-btn" onClick={save}>Save</span>
                    <span className="del-btn">Delete</span>
                </span>
            </span>
            <ReactQuill className="editor" placeholder="Your Note Here" value={content} onChange={setContent} />
        </div>
    );
}


export default Edit;