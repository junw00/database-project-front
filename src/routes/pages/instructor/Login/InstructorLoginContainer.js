import React, { useState } from "react";

import axios from "axios";
import InstructorPresenter from "./InstructorLoginPresenter";

const InstructorLoginContainer = () => {

    const [instructorId, setInstructorId] = useState('')
    const [instructorPassword, setInstructorPassword] = useState('')

    const logout = async () => {
        const res = await axios.post("http://localhost:8080/logout", {}, {
            headers: {'Content-Type': 'application/json' }
        })

        if(res.data.codeNum === 200 && res.data.message === 'success') {
            localStorage.clear()
        }
    }

    const onClickInstructorLogin = async () => {
        try{
            const res = await axios.post("http://localhost:8080/instructor/login", {
                instructorNum: instructorId,
                instructorPassword: instructorPassword
            },{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            if (res.data.codeNum === 200 && res.data.message === "로그인 성공") {
                // 서버 응답 데이터에서 필요한 값 저장
                const studentData = res.data.data;
                console.log(studentData)
                // sessionStorage.setItem("student", studentData)
                localStorage.setItem("studentNum", studentData.instructorNum);
                localStorage.setItem("studentName", studentData.instructorName);
                alert("로그인 성공!");
            } else {
                alert(res.data.message);
            }
            
            window.location.href = 'http://localhost:3000/instructors'

        }catch(err) {
            console.log(err)
        }
        
    }

    return(
        <InstructorPresenter signin={onClickInstructorLogin} setInstructorId={setInstructorId} setInstructorPassword={setInstructorPassword} logout={logout}/>
    )
}

export default InstructorLoginContainer;