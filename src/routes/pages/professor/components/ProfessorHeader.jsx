import React from 'react'
import './professorHeader.css'
import { Link } from 'react-router-dom';


const ProfessorHeader = () => {
    return (
        <div className="professor-header">
            <div className="professor-header-title">
                <Link to ='/professors' className='professor-header-link'>
                <h1>비교과 e-Class</h1>
                </Link>
                <span>DSU</span>
            </div>
        </div>
    )
}

export default ProfessorHeader;
    