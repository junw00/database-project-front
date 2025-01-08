import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import './OpenProgramList.css'
import Header from '../../../../../Components/Header'

const OpenProgramList = () => {
  const [programs, setPrograms] = useState([]);
  const korean = {
    'expert': '전문',
    'global': '글로벌',
    'tenacity': '인성',
    'creativity': '창의성'
  }

  const [core] = useState([
    'expert',
    'global',
    'tenacity',
    'creativity'
  ])
  const navigate = useNavigate();

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const res = await axios.get('http://localhost:8080/programs', {
          headers: { 'Content-Type': 'application/json' }
        });
        // 모집 중인 프로그램만 필터링
        const runningPrograms = res.data.data.filter(program => program.operationStatus === '모집중');
        console.log(runningPrograms);
        setPrograms(runningPrograms);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    getPrograms();
  }, []);

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div className='open-program-container'>
      <Header />
      
      <h1>모집중 프로그램</h1>
      <button className='open-program-btn' onClick={handleBackPage}>뒤로가기</button>
      <div className="open-program-section">
        {programs.map((program) => (
          <Link to={`/programs/${program.id}`} key={program.id}>
          <div key={program.id} className="open-program-item">
            <h3>{program.programTitle}</h3>
            <p>{program.durationType}</p>
            <p>운영일시: {program.startDate} ~ {program.endDate}</p>
            <p>담당자: {program.instructorName}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OpenProgramList;
