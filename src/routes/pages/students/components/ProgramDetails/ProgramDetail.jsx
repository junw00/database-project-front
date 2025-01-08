import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProgramDetail.css'; // CSS 파일을 import 해야 합니다
import Header from '../../../../../Components/Header';

const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBackPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/programs`);
        const selectedProgram = response.data.data.find(p => p.id === parseInt(id));
        setProgram(selectedProgram);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    };

    fetchProgram();
  }, [id]);

  if (!program) return <div className="program-detail-loading">로딩 중...</div>;

  return (
    <div className="program-detail-container">
        <Header />
        <button className="program-detail-btn" onClick={handleBackPage}>뒤로가기</button>
      <h1 className="program-detail-title">{program.programTitle}</h1>
      <div className="program-detail-content">
        <p className="program-detail-item"><strong>프로그램 내용:</strong> {program.programContent}</p>
        <p className="program-detail-item"><strong>기간:</strong> {program.durationType}</p>
        <p className="program-detail-item"><strong>운영 일시:</strong> {program.startDate} ~ {program.endDate}</p>
        <p className="program-detail-item"><strong>모집 기간:</strong> {program.recruitmentPeriod}</p>
        <p className="program-detail-item"><strong>담당자:</strong> {program.instructorName}</p>
        <p className="program-detail-item"><strong>대상 학생:</strong> {program.targetStudent}</p>
        <p className="program-detail-item"><strong>참가 인원:</strong> {program.participantNum}명</p>
        <p className="program-detail-item"><strong>총 수업일:</strong> {program.totalClassDay}일</p>
        <p className="program-detail-item"><strong>학점:</strong> {program.point}점</p>
        <p className="program-detail-item"><strong>연도:</strong> {program.year}</p>
        <p className="program-detail-item"><strong>학기:</strong> {program.semester}</p>
        <p className="program-detail-item"><strong>운영 상태:</strong> {program.operationStatus}</p>
      </div>
      <div className="program-detail-core-competency">
        <h2 className="program-detail-subtitle">핵심역량 점수</h2>
        <ul className="program-detail-list">
          <li className="program-detail-list-item">전문성: {program.expert}</li>
          <li className="program-detail-list-item">글로벌: {program.global}</li>
          <li className="program-detail-list-item">인성: {program.tenacity}</li>
          <li className="program-detail-list-item">창의성: {program.creativity}</li>
        </ul>
      </div>
      <button className="program-detail-recommend-button">추천 요청</button>
    </div>
  );
};

export default ProgramDetail;
