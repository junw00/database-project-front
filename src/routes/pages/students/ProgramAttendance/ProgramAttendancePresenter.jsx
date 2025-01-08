import React from 'react';
import './ProgramAttendance.css';

const ProgramAttendancePresenter = () => {
    return (
        <div className="ProgramAttendancePresenter-container">
            <div className="attendance-status">
                <div className="status-header">
                    <h2>출석 현황</h2>
                    <div className="status-info">
                        <span>현재 출석률: 33%</span>
                        <span>이수까지 남은 출석: 3</span>
                    </div>
                </div>

                <div className="attendance-table">
                    <table>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>프로그램 제목</th>
                            <th>수업일시</th>
                            <th>출석현황</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>프로젝트 A</td>
                            <td>2024-12-11</td>
                            <td className="status-absent">결석</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>프로젝트 A</td>
                            <td>2024-12-11</td>
                            <td className="status-present">출석</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>프로젝트 A</td>
                            <td>2024-12-11</td>
                            <td className="status-absent">결석</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProgramAttendancePresenter;
