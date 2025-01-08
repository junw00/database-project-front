import React, { useEffect, useState } from "react";
import './programList.css'; // CSS 파일 import
import { Link } from "react-router-dom";

const ProgramList = ({ title, unreadClass, unreadNotice, unfinishedAssignmentCount, unAttendanceCount, team, id }) => {
    console.log(id)
    const [menuItems] = useState([
        { name: '공지', path: `/notice/${id}`, badge: unreadNotice },
        { name: '과제', path: `/assignments/${id}`, badge: unfinishedAssignmentCount },
        { name: '강의자료', path: `/materials/${id}`, badge: unreadClass },
        { name: '출석', path: `/attendance/${id}`, badge: unAttendanceCount },
    ]);
    const [teamJang, setTeamJang] = useState('');
    const [teamOne, setTeamOne] = useState([]);

    

    // 팀 정보를 설정하는 로직
    useEffect(() => {
        if (team !== null) {
            let leader = '';
            const members = [];

            for (let student of team) {
                if (student.role === '팀장') {
                    leader = student.studentName;
                } else {
                    members.push(student);
                }
            }

            setTeamJang(leader);
            setTeamOne(members);
        }
    }, [team]); // team이 변경될 때만 실행

    return (
        <div className="program-list-container">
            {/* 팀 정보 */}
            <div className="program-list-right">
                <div className="program-list-team-info">
                    {team !== null && (
                        <div>
                            팀장: <span>{teamJang}</span> 팀원:{' '}
                            {teamOne.map((a, idx) => (
                                <span key={idx}>{a.studentName} </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="program-list-title">{title}</div>
            </div>

            {/* 메뉴 */}
            <div className="program-list-menu">
                {menuItems.map((item, index) => (
                    <Link to={item.path} className="program-list-link" key={index}>
                        {item.name}
                        {item.badge > 0 && (
                            <span className="program-list-badge">{item.badge}</span>
                        )}
                    </Link>
                ))}
            </div>
            <span>예상 학습 포인트: {6}</span>
            {/* 프로그램 홈 버튼 */}
            <a href={`program/${id}`} className="program-list-button">프로그램 홈 바로가기 →</a>
        </div>
    );
};

export default ProgramList;
