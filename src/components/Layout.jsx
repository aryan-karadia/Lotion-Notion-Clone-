import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";




const Layout = () => {
    const navigate = useNavigate();
    const [idnum, setIdnum] = useState(1);

    
    const newNote = () => {
        setIdnum(idnum + 1);
        const noteTitles = document.querySelector("#note-titles");
        const newNote = document.createElement("div");
        if (document.querySelector(".temp")) {
        const temp = document.querySelector(".temp");
        temp.parentNode.removeChild(temp);
        }
        newNote.className = "note-title";
        newNote.innerHTML = `<h2>Untitled</h2><p>...</p>`;
        newNote.setAttributeNode(document.createAttribute("id"));
        newNote.id = `note-${idnum}`;
        newNote.addEventListener("click", () => {
            navigate(`Notes/${idnum}`);
        });
        noteTitles.appendChild(newNote);

        localStorage.clear();
        navigate(`Notes/${idnum}/edit`);
    }

    const toggleMenu = () => {
        const menu = document.querySelector(".side-menu");
        menu.style.display === "none" ? menu.style.display = "flex" : menu.style.display = "none";
    }

    return (
        <>    
            <header>
                <span className="menu-toggle" onClick={toggleMenu}>&#9776;</span>
                <div className="header-text">                
                    <h1>Lotion</h1>
                    <p>Like Notion, but worse.</p>
                </div>
                <span className="filler"></span>
            </header>
            <div id="content">
                <div className="side-menu">
                    <div className="side-header">
                        <h1>Notes</h1>
                        <span className="new-note" onClick={newNote}>&#43;</span>
                    </div>
                    <div id="note-titles">
                        <p  className="temp" style={{color: "var(--secondary-color)"}}>No Notes Yet</p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    )
}

export default Layout;