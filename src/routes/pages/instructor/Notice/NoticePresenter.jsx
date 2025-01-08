import React, { useEffect, useState } from 'react';
import './NoticePresenter.css';
import ProgramHomeHeader from '../../students/components/ProgramHome/ProgramHomeHeader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const NoticePresenter = () => {
  const [noticeData, setNoticeData] = useState({
    title: '',
    content: '',
    deadline: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoticeData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const [program, setProgram] = useState('')

  const { id } = useParams()
  

  const submitNotice = async () => {

    if(noticeData.title.length > 0 && noticeData.content.length > 0)

    try {
      const res = await axios.post(`http://localhost:8080/program/${id}/notice`, {
        title: noticeData.title,
        content: noticeData.content,
        deadline: noticeData.deadline
      }, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      window.location.href='http://localhost:3000/instructors'
    } catch(err) {
      console.log(err)
    }
    
  }

  useEffect(() => {
    const getProgramInfo = async () => {
      const res = await axios.get(`http://localhost:8080/program/${id}`)
      console.log(res.data.data)
      setProgram(res.data.data)
    }

    getProgramInfo() 
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitNotice(); // submitNotice 함수 호출
  };



  return (
    <>
      <ProgramHomeHeader/>
      <div className="notice-form">
      

        <div className="book-title">
          <span>📢 {program.programTitle}</span>
        </div>


          <div className="notice-box">
            <div className="notice-header">
              <h3>공지사항 작성</h3>
            </div>
            
          <input
            type="text"
            name="title"
            className="notice-title-input"
            placeholder="제목을 입력하세요"
            value={noticeData.title}
            onChange={handleInputChange}
          />

          <textarea
            name="content"
            className="notice-content-input"
            placeholder="내용을 입력하세요"
            value={noticeData.content}
            onChange={handleInputChange}
          />

          {/* <div className="notice-options">
            <div className="deadline-setting">
              <span>게시 기한: </span>
              <input
                type="date"
                name="deadline"
                value={noticeData.deadline}
                onChange={handleInputChange}
              />
            </div>
          </div> */}
        </div>
        <button type="button" className="submit-btn" onClick={handleSubmit}>등록하기</button>

      </div>
    </>
  );
};

export default NoticePresenter;