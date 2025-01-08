// components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import ProgramHomeHeader from '../ProgramHome/ProgramHomeHeader';
import ProgramHomeSidebar from '../ProgramHome/ProgramHomeSidebar';

const ProgramHomeLayout = () => {
    return (
        <div className="ProgramHomePresenter-container">
            <ProgramHomeHeader />
            <div className="content-wrapper">
                <ProgramHomeSidebar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProgramHomeLayout;
