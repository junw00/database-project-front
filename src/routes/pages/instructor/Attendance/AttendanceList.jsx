import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AttendanceList.css';

const AttendanceList = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [programInfo, setProgramInfo] = useState('');
    const { programId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendanceList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/instructors/attendance/${programId}`);
                setProgramInfo(response.data.programInfo);
                console.log('Program info:', response.data.programInfo);
                console.log('Attendance data:', response.data.attendanceSummary);
                setAttendanceList(response.data.attendanceSummary);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceList();
    }, [programId]);

    const handleCreateAttendance = () => {
        navigate(`/instructors/attendance/${programId}/edit`);
    };

    const handleSelectAttendance = (date) => {
        navigate(`/instructors/attendance/${programId}/${date}`);
    };

    if (!attendanceList) return <div>로딩 중...</div>;

    return (
        <div className="attendance-list-container">
            <h1> 출석 현황</h1>
            <button 
                className="create-attendance-btn" 
                onClick={handleCreateAttendance}
            >
                출결 생성하기
            </button>
            <table className="attendance-list-table">
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>출석 학생 수</th>
                        <th>결석 학생 수</th>
                        <th>출석률</th>
                        <th>상세 보기</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceList.map((attendance, index) => (
                        <tr key={index}>
                            <td>{new Date(attendance.classDate).toLocaleDateString()}</td>
                            <td>{attendance.presentStudents}</td>
                            <td>{attendance.absentStudents}</td>
                            <td>{((attendance.presentStudents / (attendance.presentStudents + attendance.absentStudents)) * 100).toFixed(2)}%</td>
                            <td>
                                <button onClick={() => handleSelectAttendance(attendance.classDate)}>상세 보기</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceList;
