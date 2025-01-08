import React from "react";
import Header from "../../../../Components/Header";

const InstructorPresenter = ({ setInstructorId, setInstructorPassword, signin }) => {

    
    return(
        <div className="student-login-container">
            <Header />
            <h3>강사</h3>
            {/* <form action="/student/login" method="post"> */}
            <input type="text" onChange={(e) => setInstructorId(e.target.value)}/>
            <input type="password" onChange={(e) => setInstructorPassword(e.target.value)}/>
            <button onClick={signin}>로그인</button>
            {/* </form> */}
        </div>
    )
}

export default InstructorPresenter;