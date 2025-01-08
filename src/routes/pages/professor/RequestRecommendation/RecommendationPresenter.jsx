import React from "react";
import "./Recommendationpresenter.css";

const Recommendationpresenter = () => {
  return (
    <div>
      {/* 헤더 */}
      <header className="header">
        <div className="header-title">비교과 e-Class</div>
        <div className="header-dsu">DSU</div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        <h2 className="recommendation-title">추천 요청 확인</h2>
      </div>
    </div>
  );
};

export default Recommendationpresenter;

