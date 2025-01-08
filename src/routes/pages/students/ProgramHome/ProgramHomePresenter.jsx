import React from 'react';
import './ProgramHome.css'


const ProgramHomePresenter = () => {
    return (
        <div className="ProgramHomePresenter-container">
                <div className="main-content">
                    <section className="notice-section">
                        <h2>최근 공지사항 <span className="more-icon">»</span></h2>
                        <div className="notice-list">
                            <div className="notice-item">
                                <span>2024-2학기 TOPCIT 평가 응시 안내</span>
                                <span className="date">2024.10.29</span>
                            </div>
                            <div className="notice-item">
                                <span>2024-2학기 TOPCIT 평가 사전 준비물 안내</span>
                                <span className="date">2024.10.29</span>
                            </div>
                        </div>
                    </section>

                    <section className="assignment-section">
                        <h2>과제 수행 <span className="more-icon">»</span></h2>
                        <div className="assignment-list">
                            <div className="assignment-item">
                                <span>[과제1 생성됨] TOPCIT 연습 문제를 풀고 제출하...</span>
                                <span className="status">게시됨</span>
                            </div>
                        </div>
                    </section>

                    <section className="attendance-section">
                        <h2>출석 현황 <span className="more-icon">»</span></h2>
                        <div className="attendance-info">
                            <p>현재 출석 횟수: 5회</p>
                            <p>이수 완료까지 남은 출석 횟수: 3회</p>
                        </div>
                    </section>
                </div>
        </div>
    )
}

export default ProgramHomePresenter
