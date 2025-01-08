import React from 'react'
import './ProgramHomeHeader.css';
import {Link} from "react-router-dom";

const ProgramHomeHeader = () => {
    return (
        <div className="programHomeHeader-container">
            <div className="programHomeHeader-wrap">
                <Link to='/' className="programHomeHeader-logo-name">MYDEX e-Class</Link>
                <div className="programHomeHeader-logo-image">DSU</div>
            </div>
        </div>
    );
}

export default ProgramHomeHeader;
