import React, {useEffect, useState} from "react";
import './ProfessorMain.css';

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../Components/Header";
import { se, tr } from "date-fns/locale";


const ProfessorMainPresenter = () => {

  const [activeBtn, setActiveBtn] = useState('학기 선택');
  const [selectedSemester, setSelectedSemester] = useState('1학기');
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [programss, setProgramss] = useState([]);
  const [runProgram, setRunProgram] = useState([{}])
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [programId, setProgramId] = useState(0)
  const [len, setLen] = useState(0)
  const [len2, setLen2] = useState(0)
  useEffect(() => {
    
  }, []);

  // 추가 모달
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamLeader, setTeamLeader] = useState(null);

  const navigate = useNavigate()

  const handleRecommendClick = (e) => {
    e.stopPropagation(); // 버블링 방지
    
    if (selectedStudents.length === 0) {
      alert("학생을 선택해주세요.");
      return;
    }
    
    // 한 명만 선택된 경우 바로 개별 추천
    if (selectedStudents.length === 1) {
      onClickRecommend(programId);
      return;
    }
    
    // 두 명 이상인 경우 모달창 표시
    setShowRecommendModal(true);
  };

  const handleRecommendType = (type) => {
    if (type === 'individual') {
      // 개별 추천 처리
      onClickRecommend(programId);
      setShowRecommendModal(false);
    } else {
      // 팀별 추천 모달 표시
      setShowRecommendModal(false);
      setShowTeamModal(true);
    }
  };

  const handleIndividualRecommend = () => {
    // 개별 추천 로직 구현
    console.log('개별 추천:', selectedStudents);
  };

  const handleTeamRecommend = async () => {
    // 팀 추천 로직 구현

    try {
      const res = await axios.post('http://localhost:8080/recommend', {
        id: programId,
        teamLeader: teamLeader,
        students: selectedStudents
      }, {
        headers: {'Content-Type' :'application/json'},
        withCredentials: true
      })
      console.log(res.data.data)
      if(res.data.data === '성공') {
        alert('추천 성공')
        window.location.href='http://localhost:3000/professors'

      }
    }catch(err) {
      console.log(err)
    }
    

    console.log('팀 추천:', selectedStudents, '팀장:', teamLeader);
    setShowTeamModal(false);
  };

  // const students = [
  //   { id:  1, name: "김지원", redCount: 10, blueCount: 8, yellowCount: 2 },
  //   { id: 2, name: "박서준", redCount: 15, blueCount: 0, yellowCount: 15 },
  //   { id: 3, name: "이민호", redCount: 19, blueCount: 13, yellowCount: 6 },
  //   { id: 4, name: "정유진", redCount: 23, blueCount: 23, yellowCount: 0 },
  //   { id: 5, name: "한소희", redCount: 8, blueCount: 5, yellowCount: 3 }
  // ];

  const [students, setStudents] = useState([])


  
  const korean = {
    'expert': '전문',
    'global': '글로벌',
    'tenacity': '인성',
    'creativity': '창의성'
  }

  const [haksim, setHaksim] = useState([
    'expert',
    'global',
    'tenacity',
    'creativity'
  ])

  const onClickRecommend = async (id) => {
    //개별
    console.log(selectedStudents)
    // console.log(program)
    try {
      const res = await axios.post('http://localhost:8080/recommend', {
        id: id,
        students: selectedStudents
      }, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })

      console.log(res.data.data)
      if(res.data.data === '이미 추천한 프로그램입니다.'){
        alert(res.data.data)
      }
      if(res.data.data === true) {
        alert('추천 성공')
        window.location.href = 'http://localhost:3000/professors'
      }
      
    }catch(err) {
      console.log(err)
    }    
  }

  useEffect(() => {
    const getPrograms = async () =>{ 
      const res = await axios.get('http://localhost:8080/programs',{
        headers: {'Content-Type': 'application/json'}
      })
      // console.log(res.data.data)
      setProgramss(res.data.data)
    }
    getPrograms()

    const getStudents = async () => {
      const res = await axios.get('http://localhost:8080/students', {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      setStudents(res.data.data)
      console.log(res.data.data)
    }

    getStudents()


    const getState = async () => {
      try {

        const res = await axios.get('http://localhost:8080/recommend/state', {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true   
        });
        setLen(res.data.data.length)
        let cnt = 0;
        for(let r of res.data.data) {
          if(r.recommendProgramStatus === '안읽음' || r.recommendProgramStatus === '읽음') {
            cnt++;
          }
        }
        setLen2(cnt)
      } catch(err) {
        console.log(err);
      }
    };
    
    getState();
  }, [])

  useEffect(() => {
      const runningP = []

    for(let program of programss) {
      if(program.operationStatus === '모집중') {
        runningP.push(program)
      }
      setRunProgram(runningP);
    }

  },[programss])

  const handleCheckboxChange = (studentNum) => {
    if (selectedStudents.includes(studentNum)) {
      // 이미 선택된 경우, 선택 해제
      setSelectedStudents(selectedStudents.filter((num) => num !== studentNum));
      console.log(selectedStudents)
    } else {
      // 선택되지 않은 경우, 추가 (최대 4명까지)
      if (selectedStudents.length < 4) {
        setSelectedStudents([...selectedStudents, studentNum]);
      } else {
        alert("최대 4명까지만 선택할 수 있습니다.");
      }
    }
    console.log(selectedStudents)
  };


  const StudentList = ({students}) => {
    return (
      <div className="professor-student-list">
        {students.map((student, i) => (
          <div key={student.studentNum} className={`professor-student-item ${student.success === "10점" ? "highlight" : ""}`}>
            <input
            type="checkbox"
            checked={selectedStudents.includes(student.studentNum)} // 체크 상태 관리
            onChange={() => handleCheckboxChange(student.studentNum)} // 체크박스 변경 처리
          />
            <span className="name">{student.studentName }</span>
            <span className="red-number">{student.redCount}</span>
            <span className="blue-number">{student.blueCount}</span>
            <span className="yellow-number">{student.yellowCount}</span>
          </div>
        ))}
      </div>
    );
  };
  

  const ProgramList = ({programs}) => {
    const [selectedProgram, setSelectedProgram] = useState(null);


     // 프로그램 선택 시 관련 학생 가져오기
  useEffect(() => {
    const getStudent = async () => {
      if (selectedProgram != null) {
        try {
          const res = await axios.get(`http://localhost:8080/recommend/${selectedProgram}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          // 데이터 정렬: success가 "10점"인 학생을 맨 위로 이동
          const sortedStudents = res.data.data.sort((a, b) => {
            if (a.success === "10점") return -1; // success가 "10점"이면 맨 위로
            if (b.success === "10점") return 1;
            return 0; // 나머지는 순서 유지
          });
          console.log(sortedStudents)
          setStudents(sortedStudents);
          
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    getStudent();

  }, [selectedProgram, students]);

  
    // console.log(programs)
    return (
      <div className="professor-program-grid">
        {programs.map((program, i) => (
          <div
            key={program.id} 
            className={`professor-program-card ${selectedProgram === program.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedProgram(program.id);
              setProgramId(program.id)
              console.log(programId)
            }
            }
          >
            <div className="ljw-program-list">
              <span className={`professor-status ${program.status === '장기' ? 'long' : 'short'}`}>
                {program.durationType}
              </span>
              <span>{program.operationStatus}</span>
            </div>
            <h3>{program.programTitle}</h3>
            <p>운영일시: {program.startDate} ~ {program.endDate}</p>
            <p>참여대상: {program.targetStudent}</p>
            <p>참여인원: {program.participantNum}</p>
            <div className="ljw-haksim">
              {haksim.map((h, i) => (
                
                  <p>{korean[h]}: {program[h]}</p>

              ))}
            </div>
            {/* <p>목적 역량: {program.competency}</p> */}
            <div>
              <p>담당자: {program.instructorName}</p>
              <Link to={`program/${programId}`} className="program-link">바로가기</Link>
              <button 
                onClick={(e) => handleRecommendClick(e)}
                className="professor-recommend-button"
                >
                추천
              </button>
            </div>
            {/* <p>관련 키워드: {program.keywords}</p> */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="professor-main-container">

      <Header/>

      <div className="professor-main-content">
        {/* 상단 섹션 */}
        <div className="professor-top-section">

          <div className="professor-main-title">
            <h2>지도학생 목록</h2>
          </div>

          <div className="professor-status-favorite-wrapper">
            <div className="professor-status-buttons">

              <Link to="/check">
              <div className="professor-status-button">
                <span className="professor-number">2</span>
                <span>추천 요청</span>
              </div>
              </Link>

              <Link to="/unread">
              <div className="professor-status-button">
                <span className="professor-number">{len2}</span>
                <span>독촉하기</span>
              </div>
              </Link>

              <Link to="/recommendation-status">
              <div className="professor-status-button">
                <span className="professor-number">{len}</span>
                <span>추천 현황</span>
              </div>
              </Link>

              <Link to="/messages">
              <div className="professor-status-button">
                <span className="professor-number">2</span>
                <span>메세지함</span>
              </div>
              </Link>

            </div>

            <div className="professor-favorite-section">
              <h3>즐겨찾기 학생 목록</h3>
              <div className="professor-favorite-student-list">
                <div className="professor-favorite-student-item">
                  <span className="star-icon">★</span>
                  <span className="professor-student-name">김원오</span>
                  <span className="professor-detail-link"></span>
                </div>
                {/* 추가 즐겨찾기 항목들 */}
              </div>
            </div>

          </div>

          <div className="professor-search-section">
            <div className="professor-search-bar">
              <input type="text" placeholder="검색어를 입력하세요" />
              <button className="professor-search-button">검색</button>
            </div>
            {/* <span className="professor-recommendation-link">추천한 프로그램 확인</span> */}
          </div>
        </div>

        {/* 하단 섹션 */}
        <div className="professor-bottom-section">
          <div className="professor-student-section">
          <div className="professor-filter-section">
      <div className="professor-semester-selector">
        <button 
          className={`professor-semester-btn ${activeBtn === '학기 선택' ? 'active' : ''}`}
          onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
        >
          {selectedSemester} ▼
        </button>
        {showSemesterDropdown && (
          <div className="professor-semester-dropdown">
            <div onClick={() => {
              setSelectedSemester('1학기');
              setShowSemesterDropdown(false);
            }}>1학기</div>
            <div onClick={() => {
              setSelectedSemester('2학기');
              setShowSemesterDropdown(false);
            }}>2학기</div>
          </div>
        )}
      </div>

      <button className="professor-favorite-btn"> 즐겨찾기 </button>

    </div>
    
    {/* 추가 모달 */}
    
    <div className="professor-student-list">
      
      <StudentList students={students} />

      {/* 추가 추천 유형 선택 모달 */}
      {showRecommendModal && (
        <div className="assignment-detail-modal">
          <div className="assignment-detail-modal-content">
            <h3>추천 유형 선택</h3>
            <div className="assignment-detail-modal-buttons">
              <button onClick={() => handleRecommendType('individual')}>개별 추천</button>
              <button onClick={() => handleRecommendType('team')}>팀별 추천</button>
            </div>
            <button className="assignment-detail-modal-close" onClick={() => setShowRecommendModal(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 팀 구성 모달 */}
      {showTeamModal && (
  <div className="assignment-detail-modal">
    <div className="assignment-detail-modal-content">
      <h3>팀장 선택</h3>
      <div className="assignment-detail-team-members">
        {selectedStudents.map(studentNum => {
          const student = students.find(s => s.studentNum === studentNum);
          return (
            <div 
              key={studentNum} 
              className={`assignment-detail-team-member ${teamLeader === studentNum ? 'selected' : ''}`}
              onClick={() => setTeamLeader(studentNum)}
            >
              <input
                type="radio"
                name="teamLeader"
                checked={teamLeader === studentNum}
                readOnly
              />
              <span>{student.studentName}</span>
            </div>
          );
        })}
      </div>
      <button 
        className="assignment-detail-team-submit" 
        onClick={handleTeamRecommend}
      >
        팀 추천하기
      </button>
      <button className="assignment-detail-modal-close" onClick={() => setShowTeamModal(false)}>취소</button>
    </div>
  </div>
)}

    </div>

          </div>
          <div className="professor-program-section">
            <h2>비교과 프로그램 목록</h2>
            {/* {runProgram.map((program) => (
              <ProgramList
                key={program.id} 
                program={program} 
        />
      ))} */}
            <ProgramList programs={runProgram}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorMainPresenter;