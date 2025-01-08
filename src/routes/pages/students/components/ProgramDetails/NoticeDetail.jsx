import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './NoticeDetail.css'; // CSS 파일을 import 해야합니다

const NoticeDetail = () => {
  const { id, materialId } = useParams();
  const [noticeDetail, setNoticeDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchNoticeDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/material/detail/${id}/${materialId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });
        setNoticeDetail(res.data.data)
        console.log("All materials:", res.data.data);
      } catch (error) {
        console.error('Error fetching notice detail:', error);
        setError('공지사항을 불러오는 데 실패했습니다.');
      }
    };
  
    fetchNoticeDetail();
  }, [id, materialId]);
  
  

  if (!noticeDetail) return <div>로딩 중... {error}</div>;

    return (
        <div className="ProgramNoticeDetail-container">
            <h2 className="notice-detail-title">제목: {noticeDetail.title}</h2>
            <div className="notice-detail-content">내용: {noticeDetail.content}</div>
            <div className="notice-detail-date">업로드 날짜: {noticeDetail.modificationDate ? noticeDetail.modificationDate : noticeDetail.uploadDate}</div> 
        </div>
    );
};

export default NoticeDetail;
