import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './ProgramHomeSidebar.css';

const ProgramHomeSidebar = () => {
    // useParams로 id를 받아옵니다.
    const { id } = useParams();

    return (
        <div className="programHomeSidebar-container">
            <div className="semester">2024-1학기</div>

            <nav className="sidebar-menu">
                <NavLink to={`/program/${id}`} className="menu-item">홈</NavLink>
                <NavLink to={`/notice/${id}`} className="menu-item"> 공지사항</NavLink>
                <NavLink to={`/assignments/${id}`} className="menu-item">과제</NavLink>
                <NavLink to={`/materials/${id}`} className="menu-item">강의자료</NavLink>
                <NavLink to={`/attendance/${id}`} className="menu-item">전자출결</NavLink>
                <NavLink to={`/survey/${id}`} className="menu-item">만족도 조사</NavLink>
                <NavLink to={`/users/${id}`} className="menu-item">사용자 그룹</NavLink>
            </nav>
        </div>
    );
};

export default ProgramHomeSidebar;
