import React, { useEffect, useState } from "react";
/*
    css를 불러올 때는 아래와 같이 불러오면 된다.
    css는 따로 css파일을 만들어 사용하는게 관리하기가 편하다.
*/
import './studentMain.css'
import Header from "../../../../Components/Header";
import ProgramList from "../components";
import RecommendCard from "../components/RecommendCard";
import axios from "axios";
import { Link } from "react-router-dom";
/* 
    하나의 페이지를 Container와 Presenter로 분리하고 각 역할은 아래와 같다

    * Container: 백엔드에서 데이터를 불러와 state 관리, 로직을 담당하는 함수 선언
    * Presenter: 불러온 데이터를 토대로 페이지에 출력, 함수 사용
*/
/*
    ※ 컴포넌트 이름(함수 이름)은 무조건 대문자로 시작해야 함!! ※
      만약 소문자로 시작한다면 컴포넌트를 출력할 수 없으므로 반드시 주의해서 작성할 것
*/
const MainPresenter = () => {

    const [programs, setPrograms] = useState([]);
    const [longPrograms, setLongProgram] = useState([])
    const [shortPrograms, setShortProgram] = useState([])
    const [endPrograms, setEndPrograms] = useState([])
    const [garbageP, setGarbageP] = useState([])
    const [garbageTime, setGarbageTime] = useState([])
    const [emergencyAssign, setEmergencyAssign] = useState([]) 
    const [recommends, setReommends] = useState([])
    const [aa, AA] = useState([])
    const MATERIAL = [
        'unfinishedAssignmentCount',
        'unreadClassMaterialCount',
        'unreadNoticeCount',
    ]
    const [material, setMateiral] = useState({
        'unfinishedAssignmentCount': 0,
        'unreadClassMaterialCount': 0,
        'unreadNoticeCount': 0,
    })

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarWidth = 240; // 사이드바 너비

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Extract only YYYY-MM-DD part
    };



    // console.
    console.log(aa)
    useEffect(() => {
        //신청한 프로그램
        const participantProgram = async () => {
            try {
                console.log("1")
                const res = await axios.post('http://localhost:8080/participant', {
                }, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });
                setPrograms(res.data.data)
                let unfinished = [];
console.log(res.data.data);

for (let i = 0; i < res.data.data.length; i++) {
    let program = res.data.data[i];
    if (program.unfinished.length !== 0) {
        for (let j = 0; j < program.unfinished.length; j++) {
            unfinished.push({
                programId: program.id,
                programTitle: program.programTitle,
                assignmentId: program.unfinished[j].id,
                assignmentTitle: program.unfinished[j].programTitle, // Assuming this is the correct field for assignment title
                garbageDay: program.unfinished[j].garbageDay
            });
        }
    }
}

console.log(unfinished);
AA(unfinished); // Assuming AA is a function that processes the unfinished array
setEmergencyAssign(unfinished); // Assuming setEmergencyAssign is a state setter or similar function


                
                const res1 = await axios.get('http://localhost:8080/recommend', {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,
                })
                setReommends(res1.data.data)
                
                let garbage = []
                let garbageTime = []

                for(let p of res1.data.data) {
                    if(p.garbage !== 0) {
                        garbage.push(p)
                    }
                    if(p.garbageTime !== 0) {
                        garbageTime.push(p)
                    }
                }

                setGarbageP(garbage)
                setGarbageTime(garbageTime)
                console.log(res1.data.data)
            } catch (err) {
                console.error("Error fetching participant program:", err);
            } 
        };
        participantProgram();
    }, []); // 빈 배열로 의존성을 설정하여 컴포넌트 마운트 시 한 번만 실행

    // console.log(garbageTime)

    console.log(aa)
    useEffect(() => {
        const longProgram = [];
        const shortProgram = [];

        

        let updatedMaterial = { ...material }; // 상태 복사
        console.log(updatedMaterial)
        for (let program of programs) {
            for (let m of MATERIAL) {
                updatedMaterial[m] += program[m]; // 값을 누적
            }
            setMateiral(updatedMaterial)
            if(program.durationType === '장기') {
                longProgram.push(program)
            }else {
                shortProgram.push(program)
            }
        }
        setLongProgram(longProgram);
        setShortProgram(shortProgram);
    },[programs])
   
    return (
        <div className="main-container">

        <Header/>
        <div className="container">
            <div className="box" style={{ backgroundColor: material.unreadNoticeCount > 0 ? '#f06262' : 'gray' }}>
                {material.unreadNoticeCount}<br/>공지사항
            </div>
            <div className="box" style={{ backgroundColor: material.unfinishedAssignmentCount > 0 ? '#f06262' : 'gray' }}>
                {material.unfinishedAssignmentCount}<br/>과제
            </div>
            <div className="box" style={{ backgroundColor: material.unreadClassMaterialCount > 0 ? '#f06262' : 'gray' }}>
                {material.unreadClassMaterialCount}<br/>강의자료
            </div>
            <div className="box" style={{ backgroundColor: 'gray' }}>
                0<br/>만족도 조사
            </div>
            <div className="box" style={{ backgroundColor: recommends.length > 0 ? '#f06262' : 'gray' }}>
                {recommends.length}<br/>추천 프로그램
            </div>
            
            <Link to='/program/list' className="box-link">
            <div className="box" style={{ backgroundColor: 'gray' }}>모집 중인 프로그램</div>
            </Link>
        </div>
        

        {/* 오른쪽 알림 사항 */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
    <button onClick={toggleSidebar} className="toggle-btn">
        {isSidebarOpen ? '닫기' : '열기'}
    </button>
    <main className="content">
        <h2>참여 현황</h2>
        <article className="status-section">
            <h3>과제</h3>

            {aa.map((a) => (
                
                <p key={a.assignmentId} className="ljw">
                    <Link to={`/program/${a.programId}/assignment/${a.assignmentId}`}>
                        - {a.programTitle}에 {a.assignmentTitle || "과제 제목 없음"} 남은기간: {a.garbageDay}일
                    </Link>
                   
                </p>
            ))}


            <h3>알림사항</h3>
            {garbageP.length !== 0 && garbageP.map((gP, idx) => (
            gP.garbage !== 0 ? <p><Link key={gP.id} to={`recommend/${gP.id}`} className="ljw">{gP.programTitle} 신청 가능한 인원 {gP.garbage}명 남았습니다.</Link> </p>: null
            ))}

            {garbageTime.length !== 0 && garbageTime.map((gT, idx) => (
            gT.garbage !== 0 ? <p key={gT.id} className="ljw">{gT.programTitle} 신청 가능한 시간 {gT.garbageTime}일 남았습니다.</p> : null
            ))}

        </article>
    </main>
</div>
    <main>

        <section class="program-list-section">
            <h2>추천 프로그램</h2>
            <div class="program-list-cards">
                
                {recommends.map((recommend, index) => {
                return <RecommendCard id={recommend.id} key={recommend.id} title={recommend.programTitle} startDate={formatDate(recommend.startDate)} endDate={formatDate(recommend.endDate)} recommendState={recommend.recommendState}
                    participantNum={recommend.participantNum} dunning={recommend.dunning}
                />
                })}
            </div>
        </section>


        <section class="program-list-section">
            <h2>장기 비교과 프로그램</h2>

            {longPrograms.map((program, index) => {
                return <ProgramList key={program.id} title={program.programTitle} unAttendanceCount={program.unAttendanceCount}
                unfinishedAssignmentCount={program.unfinishedAssignmentCount}
                unreadClass={program.unreadClassMaterialCount}
                unreadNotice={program.unreadNoticeCount}
                team={program.team}
                id={program.id}
                />
            })}

        </section>
        <section class="program-list-section">
            <h2>단기 비교과 프로그램</h2>
            {shortPrograms.map((program, index) => {
                return <ProgramList key={program.id} title={program.programTitle} unAttendanceCount={program.unAttendanceCount}
                unfinishedAssignmentCount={program.unfinishedAssignmentCount}
                unreadClass={program.unreadClassMaterialCount}
                unreadNotice={program.unreadNoticeCount}
                team={program.team}
                id={program.id}
                />
            })}


        </section>

        <section class="program-list-section">
            <h2>운영종료 비교과 프로그램</h2>
            {endPrograms.map((program, index) => {
                return <ProgramList key={program.id} title={program.programTitle} unAttendanceCount={program.unAttendanceCount}
                unfinishedAssignmentCount={program.unfinishedAssignmentCount}
                unreadClass={program.unreadClassMaterialCount}
                unreadNotice={program.unreadNoticeCount}
                team={program.team}
                id={program.id}
                />
            })}


        </section>

    </main>

    </div>
    )
}

export default MainPresenter;