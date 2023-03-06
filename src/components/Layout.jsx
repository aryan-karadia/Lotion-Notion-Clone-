import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";




const Layout = () => {
    const navigate = useNavigate();
    const [idnum, setIdnum] = useState(1);

    
    const newNote = () => {
        setIdnum(idnum + 1);
        console.log(idnum);
        navigate(`Notes/${idnum}/edit`);
    }
    return (
        <>    
            <header>
                <span className="menu-toggle">&#9776;</span>
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
                        <p style={{color: "var(--secondary-color)"}}>No Notes Yet</p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    )
}

export default Layout;