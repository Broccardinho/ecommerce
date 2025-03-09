import React from "react";
import pianoImage from "../images/piano.png"
const Logo =() => {
    return (
        <div className="logo">
            <img src={pianoImage}
                 alt="Brand Logo"
                 className = "logo-image" />
        </div>
    )
}
export default Logo;