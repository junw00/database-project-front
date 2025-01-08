import React, { useEffect, useState } from "react";
import './Header.css';
import axios from "axios";
import { Link } from "react-router-dom";


const Header = () => {

  const [user, setUser] = useState({});

  const logout = async () => {
    const res = await axios.post("http://localhost:8080/logout", {}, {
        headers: {'Content-Type': 'application/json' },
        withCredentials: true
    })

    if(res.data.codeNum === 200 && res.data.message === 'success') {
        localStorage.clear()
        window.location.href='http://localhost:3000/'
    }
  }

//   const logout = async () => {
//     const res = await axios.post("http://localhost:8080/professor/logout", {}, {
//         headers: {'Content-Type': 'application/json' }
//     })

//     if(res.data.codeNum === 200 && res.data.message === 'success') {
//         localStorage.clear()
//     }
// }

// const onClickProfessorLogin = async () => {
//     try{
//         const res = await axios.post("http://localhost:8080/professor/login", {
//             professorId: Id,
//             professorPassword: studentPassword 
//         },{
//             headers: {'Content-Type': 'application/json'},
//             withCredentials: true
//         })

//         if (res.data.codeNum === 200 && res.data.message === "로그인 성공") {
//             // 서버 응답 데이터에서 필요한 값 저장
//             const studentData = res.data.data;
//             console.log(studentData)
//             // sessionStorage.setItem("student", studentData)
        
//             alert("로그인 성공!");
//         } else {
//             alert(res.data.message);
//         }
        
//         window.location.href = 'http://localhost:3000/'

//     }catch(err) {
//         console.log(err)
//     }
    
// }
  
  useEffect(() => {
    setUser({
      studentNum: localStorage.getItem('studentNum'),
      studentName: localStorage.getItem("studentName")
    })
  },[])
  return (
    <div className="header-container">
      {/* 상단 헤더 */}
      <div className="header-wrap">
        <div className="header-logo-wrap">
          <Link to ='/'>
          <h1 className="header-logo">
            DSU MYDEX
          </h1>
          </Link>
        </div>

        <div className="header-right-wrap">
        {user && user.studentName ? (
          <ul>
            <li><a href="/#">{user.studentName}</a></li>
            <li><button onClick={logout}>로그아웃</button></li>
          </ul> )
          :(
          <ul>
            <li><a href="student/login">학생 로그인</a></li>
            <li><a href="/professor-login">교수자 로그인</a></li>
            <li><a href="/instructor-login">강사</a></li>
          </ul>
        )}
        </div>
      </div>

    </div>
  );
};

export default Header;