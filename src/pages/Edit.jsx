import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("Untitled");
    const ChangeTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
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

    const [note, setNote] = useState({id: `${id}`, Title: "", Content: "", when:  formatDate(Date.now())});
    
    useEffect(() => {
        localStorage.setItem(`${id}`, JSON.stringify(note));
    }, [id, note]);

    const save = () => {
        console.log(content);
        console.log(title);
        setNote({id: `${id}`, Title: title, Content:content , when: document.querySelector(".date").value});
        localStorage.setItem(`${id}`, JSON.stringify(note));
        console.log(note);
        navigate(`/`);
        navigate(`/Notes/${id}`);
    };

    
    return (
        <div id="edit">
            <span id="edit-header">
                <div>
                    <input type="text" defaultValue={"Untitled"} className="title" onChange={ChangeTitle} />
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