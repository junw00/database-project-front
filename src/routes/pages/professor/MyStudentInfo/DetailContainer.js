import React from "react";
import "./DetailPresenter.css"; // CSS 파일 임포트

const DetailPresenter = () => {
  return (
    <div className="detail-page">
      <header className="detail-header">
        <h1>비교과 e-Class</h1>
        <span>DSU</span>
      </header>
      <main className="detail-main">
        <section className="student-section">
          <h2>지도학생 목록</h2>
          <div className="search-bar">
            <input type="text" placeholder="검색어를 입력하세요" />
            <select>
              <option>학생 이름</option>
            </select>
            <button className="search-btn">검색</button>
          </div>
        </section>
        <aside className="alert-section">
          <h3>알림사항</h3>
          <p>
            <strong>이준우</strong> 학생이 <strong>‘2024-2학기 TOPCIT 평가 지원 프로그램’</strong>
            추천에 대한 거절 사유를 전송했습니다.
          </p>
          <p className="alert-date">2024 - 11 - 26</p>
        </aside>
      </main>
    </div>
  );
};

export default DetailPresenter;
