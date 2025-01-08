import React, { useState } from "react";

import axios from "axios";
import ProfessorLogin from "./ProfessorLogin";

const ProfessorLoginContainer = () => {

    const [studentId, setStudentId] = useState('')
    const [studentPassword, setStudentPassword] = useState('')

    const logout = async () => {
        const res = await axios.post("http://localhost:8080/professor/logout", {}, {
            headers: {'Content-Type': 'application/json' }
        })

        if(res.data.codeNum === 200 && res.data.message === 'success') {
            localStorage.clear()
        }
    }

    const onClickProfessorLogin = async () => {
        try{
            const res = await axios.post("http://localhost:8080/professor/login", {
                professorNum: studentId,
                professorPassword: studentPassword
            },{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            if (res.data.codeNum === 200 && res.data.message === "로그인 성공") {
                // 서버 응답 데이터에서 필요한 값 저장
                const studentData = res.data.data;
                console.log(studentData)
                // sessionStorage.setItem("student", studentData)
                localStorage.setItem("studentNum", studentData.professorNum);
                localStorage.setItem("studentName", studentData.professorName);
                // window.location.reload('/professors')
                window.location.href='http://localhost:3000/professors'
                alert("로그인 성공!");
                
            } else {
                alert(res.data.message);
            }
            

        }catch(err) {
            console.log(err)
        }
        
    }

    return(
        <ProfessorLogin signin={onClickProfessorLogin} setProfessorId={setStudentId} setProfessorPassword={setStudentPassword} logout={logout}/>
    )
}

export default ProfessorLoginContainer;