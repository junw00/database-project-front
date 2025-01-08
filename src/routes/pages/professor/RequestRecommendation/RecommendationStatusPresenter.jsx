import React, { useEffect, useState } from "react";
import "./RecommendationStatusPresenter.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Popup = ({ rec, onClose }) => {
  if (!rec) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>추천 프로그램 상세 정보</h3>
        {rec.recommendProgramStatus === '거절' && (
          <>
            <p><strong>거절 사유:</strong> {rec.rejectMessage}</p>
            <p><strong>거절 일시:</strong> {formatDate(rec.rejectionDate)}</p>
          </>
        )}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

const RecommendationStatusPresenter = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRec, setSelectedRec] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getState = async () => {
      try {
        const res = await axios.get('http://localhost:8080/recommend/state', {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true   
        });
        setRecommendations(res.data.data);
      } catch(err) {
        console.log(err);
      }
    };
    
    getState();
  }, []);

  useEffect(() => {
    console.log("selectedRec:", selectedRec);
    console.log("showPopup:", showPopup);
  }, [selectedRec, showPopup]);

  const getStatusColor = (status) => {
    switch(status) {
      case '신청 완료': return 'green';
      case '안읽음': return 'orange';
      case '거절': return 'red';
      case '읽음': return 'blue';
      default: return 'black';
    }
  };

  const handleRowClick = (rec) => {
    if (rec.recommendProgramStatus === '거절') {
      setSelectedRec(rec);
      setShowPopup(true);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };
    

  return (
    <div>
      <button onClick={handleBackClick} className="recommend-btn">뒤로가기</button>
      <h2>추천 프로그램 상태</h2>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>프로그램</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map(rec => (
            <tr key={rec.id} onClick={() => handleRowClick(rec)}>
              <td>{rec.studentName}</td>
              <td>{rec.projectName}</td>
              <td style={{color: getStatusColor(rec.recommendProgramStatus)}}>
                {rec.recommendProgramStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && <Popup rec={selectedRec} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default RecommendationStatusPresenter;
