import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const [note, setNote] = useState({id: `${id}`, title: "Untitled", content: "Your Note Here"});
    localStorage.setItem(`${id}`, JSON.stringify(note));

    useEffect = (() => {
        console.log(id);
        setNote(JSON.parse(localStorage.getItem(`${id}`)));
        const note = JSON.parse(localStorage.getItem(`${id}`));

    }, []);
    
    return (
        <div id="edit">
            <span id="edit-header">
                <h1>{note.title}</h1> 
                <span>
                    <span className="save-btn">Save</span>
                    <span className="del-btn">Delete</span>
                </span>
            </span>
        </div>
    );
}


export default Edit;