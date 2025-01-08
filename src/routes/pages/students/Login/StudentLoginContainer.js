import React, { useState } from "react";
import StudentLoginPresenter from "./StudentLoginPresenter";
import axios from "axios";

const StudentLoginContainer = () => {

    const [studentId, setStudentId] = useState('')
    const [studentPassword, setStudentPassword] = useState('')

    const logout = async () => {
        const res = await axios.post("http://localhost:8080/logout", {}, {
            headers: {'Content-Type': 'application/json' }
        })

        if(res.data.codeNum === 200 && res.data.message === 'success') {
            localStorage.clear()
        }
    }

    const onClickStudentLogin = async () => {
        try{
            const res = await axios.post("http://localhost:8080/student/login", {
                studentId: studentId,
                studentPassword: studentPassword 
            },{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            if (res.data.codeNum === 200 && res.data.message === "로그인 성공") {
                // 서버 응답 데이터에서 필요한 값 저장
                const studentData = res.data.data;
                console.log(studentData)
                // sessionStorage.setItem("student", studentData)
                localStorage.setItem("studentNum", studentData.studentNum);
                localStorage.setItem("studentName", studentData.studentName);
                alert("로그인 성공!");
                window.location.href = 'http://localhost:3000/'
            } else {
                alert(res.data.message);
            }
            
            

        }catch(err) {
            console.log(err)
        }
        
    }

    return(
        <StudentLoginPresenter signin={onClickStudentLogin} setStudentId={setStudentId} setStudentPassword={setStudentPassword} logout={logout}/>
    )
}

export default StudentLoginContainer;