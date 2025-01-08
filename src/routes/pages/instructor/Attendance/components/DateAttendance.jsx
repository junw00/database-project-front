import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DateAttendance.css';

const DateAttendance = () => {

    const [studentList, setStudentList] = useState([]);
    const [attendanceDate, setAttendanceDate] = useState('');
    const { programId, date } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendanceDetail = async () => {
            try {
                // In a real application, you would fetch this data from an API
                // const response = await fetch(`https://api.example.com/attendance/${programId}/${date}`);
                // const data = await response.json();
                // setStudentList(data.students);
                // setAttendanceDate(data.date);

                // Simulated data for demonstration
                setAttendanceDate(date);
                setStudentList([
                    { id: 1001, name: '이준우', status: '출석' },
                    { id: 1002, name: '김원오', status: '결석' },
                    { id: 1003, name: '박지환', status: '출석' }
                ]);
            } catch (error) {
                console.error('Error fetching attendance details:', error);
            }
        };

        fetchAttendanceDetail();
    }, [programId, date]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="attendance-detail-container">
            <h1>출석 상세 현황</h1>
            <p>날짜: {attendanceDate}</p>
            <button onClick={handleBack} className="back-btn">뒤로 가기</button>
            <table className="attendance-detail-table">
                <thead>
                    <tr>
                        <th>학생 이름</th>
                        <th>출석 상태</th>
                    </tr>
                </thead>
                <tbody>
                    {studentList.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td className={student.status === '출석' ? 'present' : 'absent'}>
                                {student.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DateAttendance