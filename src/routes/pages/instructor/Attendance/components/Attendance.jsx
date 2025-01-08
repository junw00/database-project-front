import React, { useState } from 'react';
import './Attendance.css';
import { useParams } from'react-router-dom';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, name: '이준우', date: '2024-12-11', status: '결석' },
        { id: 2, name: '김원오', date: '2024-12-11', status: '출석' },
        { id: 3, name: '박지환', date: '2024-12-11', status: '결석' }
    ]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const { programId, date } = useParams();

    const changeAttendanceStatus = (studentId) => {
        setAttendanceData(attendanceData.map(student => 
            student.id === studentId 
                ? {...student, status: student.status === '출석' ? '결석' : '출석'} 
                : student
        ));
    };

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prevSelected => 
            prevSelected.includes(studentId)
                ? prevSelected.filter(id => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const bulkChangeAttendance = (newStatus) => {
        setAttendanceData(attendanceData.map(student => 
            selectedStudents.includes(student.id)
                ? {...student, status: newStatus}
                : student
        ));
        setSelectedStudents([]);
    };

    const toggleAllSelection = () => {
        if (selectedStudents.length === attendanceData.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(attendanceData.map(student => student.id));
        }
    };

    return (
        <div className="program-attendance">
            <div className="program-attendance-status">
                <div className="program-attendance-header">
                    <h2>출석 날짜</h2>
                    <div className="program-attendance-info">
                        <span>{date}</span>
                        <span>출석 인원 : {attendanceData.filter(student => student.status === '출석').length}</span>
                    </div>
                </div>

                <div className="program-attendance-actions">
                    <button onClick={toggleAllSelection}>
                        {selectedStudents.length === attendanceData.length ? '전체 선택 해제' : '전체 선택'}
                    </button>
                    <button onClick={() => bulkChangeAttendance('출석')}>선택 학생 출석</button>
                    <button onClick={() => bulkChangeAttendance('결석')}>선택 학생 결석</button>
                </div>

                <div className="program-attendance-table">
                    <table>
                        <thead>
                            <tr>
                                <th>선택</th>
                                <th>번호</th>
                                <th>학생명</th>
                                <th>수업일시</th>
                                <th>출석현황</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((student, index) => (
                                <tr key={student.id}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedStudents.includes(student.id)}
                                            onChange={() => handleSelectStudent(student.id)}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.date}</td>
                                    <td 
                                        className={`program-attendance-status-${student.status === '출석' ? 'present' : 'absent'}`}
                                        onClick={() => changeAttendanceStatus(student.id)}
                                    >
                                        {student.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
