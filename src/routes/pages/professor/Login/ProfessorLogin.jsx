import React from "react";
import Header from "../../../../Components/Header";

const ProfessorLogin = ({ setProfessorId, setProfessorPassword, signin }) => {

    
    return(
        <div className="student-login-container">
            <Header />
            <h3>교수</h3>
            {/* <form action="/student/login" method="post"> */}
            <input type="text" onChange={(e) => setProfessorId(e.target.value)}/>
            <input type="password" onChange={(e) => setProfessorPassword(e.target.value)}/>
            <button onClick={signin}>로그인</button>
            {/* </form> */}
        </div>
    )
}

export default ProfessorLogin;