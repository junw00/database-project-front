import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>추천 요청</li>
        <li>완료율</li>
        <li>추천 현황</li>
        <li>메시지함</li>
      </ul>
    </div>
  );
};

export default Sidebar;
