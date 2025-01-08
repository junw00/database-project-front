import React from "react";
import Header from "../../../../Components/Header";
import './Login.css'

const StudentLoginPresenter = ({ setStudentId, setStudentPassword, signin }) => {

    
    return(
        <div className="student-login-container">
            <Header />
            <h3>학생</h3>
            {/* <form action="/student/login" method="post"> */}
            <input type="text" onChange={(e) => setStudentId(e.target.value)}/>
            <input type="password" onChange={(e) => setStudentPassword(e.target.value)}/>
            <button onClick={signin}>로그인</button>
            {/* </form> */}
        </div>
    )
}

export default StudentLoginPresenter;