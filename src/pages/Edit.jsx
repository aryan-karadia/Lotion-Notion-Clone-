import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit = () => {
    // useEffect (() => {

    //     const note = localStorage.getItem(`${id}`);
    //     if (note) {
    //         setNote(JSON.parse(note));
    //     }

    // }, []);
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState("");
    const ChangeTitle = (e) => {
        setNote(note => ({
            ...note,
            Title :e.target.value
    }));
    };

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
    
    const [note, setNote] = useState({id: `${id}`, Title: "", Content: "", when: formatDate(Date.now())});

    const save = () => {
        let bodyText = document.querySelector(".ql-editor").innerText;
        console.log(bodyText);
        setNote(note => ({
            ...note,
            Content: bodyText,
            when :formatDate(Date.now())
            }));
        localStorage.setItem(`${id}`, JSON.stringify(note));
        console.log(note);
        navigate(`/`);
        navigate(`/Notes/${id}`);
        const noteTitle = document.querySelector(`#note-${id}`);
        noteTitle.innerHTML = `<h2>${note.Title}</h2><p style={{color: "var(--secondary-color)"}} >${note.when}</p><p>${note.Content}</p>`;
    };

    
    return (
        <div id="body">
            <span id="note-header">
                <div>
                    <input type="text" defaultValue={"Untitled"} className="title" onChange={(e) => ChangeTitle(e)} />
                    <input className="date" type="datetime-local" defaultValue={Date.now()}/>
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