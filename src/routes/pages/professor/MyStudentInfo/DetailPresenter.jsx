import React from "react";
import "./DetailPresenter.css";

const DetailPresenter = () => {
  return (
    <div>
      {/* 헤더 */}
      <header className="header">
        <div className="header-title">
          <h1>비교과 e-Class</h1>
          <span className="header-dsu">DSU</span>
        </div>
      </header>

      {/* 메인 컨테이너 */}
      <main className="detail-main">
        <section className="left-panel">
          <div className="student-list">
            <h2>학생 목록</h2>
            <div className="student-item selected">
              박지환 <span className="stats">10 / 8 / 2</span>
            </div>
            <div className="student-item">
              김승원 <span className="stats">15 / 0 / 15</span>
            </div>
            <div className="student-item">
              이준우 <span className="stats">19 / 13 / 6</span>
            </div>
          </div>
          <div className="action-bar">
            <select className="semester-select">
              <option>학기 선택</option>
            </select>
            <button className="action-btn">추천하기</button>
          </div>
        </section>

        <section className="right-panel">
          <div className="student-details">
            <h3>박지환 (20191500)</h3>
            <div className="stats-bar">
              총 추천 횟수: 10 | 참여 횟수: 8 | 거절 횟수: 2
              <button className="message-btn">메시지 보내기</button>
            </div>
            <div className="details-container">
              <div className="details-box">
                <h4>관심 키워드</h4>
                <div className="keywords">
                  <span>장학금 지급</span>
                  <span>진로 관련</span>
                  <span>해외 교육</span>
                  <span>자격증 교육</span>
                </div>
              </div>
              <div className="details-box">
                <h4>프로그램 참여 현황</h4>
                <ul>
                  <li>2024-2학기 TOPCIT 평가 지원 프로그램</li>
                  <li>BDAD 학습 공동체</li>
                  <li>AI-Korea 전시 행사 프로그램</li>
                </ul>
              </div>
              <div className="details-box">
                <h4>추천 상태</h4>
                <ul>
                  <li>쇼미더동서 (읽음)</li>
                  <li>SW 아이디어 경진 대회 (신청 완료)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DetailPresenter;
