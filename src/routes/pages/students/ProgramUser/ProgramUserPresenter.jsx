import React from 'react';
import './ProgramUser.css';

const ProgramUserPresenter = () => {
    return (
        <div className="ProgramUserPresenter-container">
            <div className="user-filter">
                <select className="filter-select">
                    <option>전체보기</option>
                </select>
                <input
                    type="text"
                    className="search-input"
                    placeholder="사용자 검색"
                />
            </div>

            <div className="user-list">
                <div className="user-header">
                    <div className="checkbox-column"></div>
                    <div className="name-column">이름</div>
                    <div className="program-column">프로그램</div>
                    <div className="role-column">역할</div>
                </div>

                <div className="user-item">
                    <div className="checkbox-column">
                        <input type="checkbox" />
                    </div>
                    <div className="name-column">박지환</div>
                    <div className="program-column">TOPCIT 평가 지원 프로그램</div>
                    <div className="role-column">학생</div>
                </div>

                <div className="user-item gray">
                    <div className="checkbox-column">
                        <input type="checkbox" />
                    </div>
                    <div className="name-column">이준우</div>
                    <div className="program-column">TOPCIT 평가 지원 프로그램</div>
                    <div className="role-column">학생</div>
                </div>

                <div className="user-item">
                    <div className="checkbox-column">
                        <input type="checkbox" />
                    </div>
                    <div className="name-column">김송원</div>
                    <div className="program-column">TOPCIT 평가 지원 프로그램</div>
                    <div className="role-column">학생</div>
                </div>
            </div>
        </div>
    )
}

export default ProgramUserPresenter;
