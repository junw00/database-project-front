import React, { useEffect, useState } from "react";
import "./UnreadPresenter.css";
import axios from "axios";
import Header from "../../../../Components/Header";
import { useNavigate } from "react-router-dom";

const UnreadPresenter = () => {

  const [recommendation, setRecommendations] = useState([])
  const navigate = useNavigate();
  const onClickDunning = async (recommendId, studentNum) => {
    try {
      const res = await axios.post(`http://localhost:8080/dunning`, {
        recommendId: recommendId,
        studentNum: studentNum
      }, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })  
      alert('독촉 성공')
      navigate('/professors')
      console.log(res.data.data)
    }catch(err) {
      console.log(err)
    }  
  }

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await axios.get('http://localhost:8080/recommend/state', {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true   
        });


        for(let rp of res.data.data) {
          if(rp.recommendProgramStatus === '읽음' || rp.recommendProgramStatus === '안읽음') {
            setRecommendations((prev) => [...prev, rp])
          }
        }

      } catch(err) {
        console.log(err);
      }
    };
    getState();
  }, []);
  console.log(recommendation)
  return (
    <div>
      
      <Header/>

      {/* 메인 컨텐츠 */}
      <div className="unread-container">
        <h2 className="unread-title">추천 프로그램 미응답 학생 목록</h2>
        <table className="unread-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>프로그램</th>
              <th>추천 일자</th>
              <th>독촉 여부</th>
            </tr>
          </thead>
          <tbody>
            {recommendation.map((r, index) => (
              <tr key={index}>
                <td>{r.studentName}</td>
                <td>{r.projectName}</td>
                <td>{r.recommendDate}</td>
                <td>
                  <button className="follow-up-btn" onClick={() => onClickDunning(r.recommendId, r.studentNum)}>독촉하기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="summary">
          <span>총 독촉 횟수</span>
          <span>독촉 후 신청 횟수</span>
        </div>
      </div>
    </div>
  );
};

export default UnreadPresenter;
