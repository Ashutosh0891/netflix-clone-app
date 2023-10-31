import './Nav.css'
import React, { useEffect, useState } from 'react'

function Nav() {
    const [show, handleShow] = useState(false)

    const scrollHandler = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        };
    }, []);
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src={require('./Netflix_Logo_RGB.png')}
                alt="Netflix Logo"
            />
            <img
                className="nav_avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Netflix Logo"
            />

        </div>
    )
}

export default Nav
