import React, { useEffect, useState } from 'react';
import './AssignmentsDetail.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AssignmentsDetail = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedExamples, setSelectedExamples] = useState([]); // New state for array-based storage
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const { id, assignmentId } = useParams();
  const navigate = useNavigate()

  const [example, setExample] = useState([]) 
  console.log(selectedExamples)
  console.log(example)
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/program/${id}/assignment/${assignmentId}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        if(res.data.data === null) {
          alert('기간이 지났습니다.')

          navigate(`/assignments/${id}`, { replace: true }); // Use navigate for redirection

          
        }
  
        setQuestions(res.data.data);
        console.log(res.data.data)
        if(res.data.data.length < 5) {
          setCount(res.data.data.length)
        }else {
          setCount(5)
        }

      } catch (err) {
        console.log(err);
      }
    };
    getQuestions();
  }, [id, assignmentId]);
  

  const handleAnswerSelect = (questionId, answerIndex, exampleData) => {
    // Object 형태로 선택한 보기 저장
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));

    // Array 형태로 선택한 보기의 전체 정보 저장
    setSelectedExamples(prev => {
      const newExamples = [...prev];
      const questionIndex = questions.findIndex(q => q.questionContent === questionId);
      newExamples[questionIndex] = { exampleData }; // 보기 데이터 추가
      return newExamples;
    });
  };

  const handleSubmit = async () => {
    console.log(11111, count)
    console.log(selectedExamples.length)
    console.log(selectedExamples)
    if(selectedExamples.length < count) {
      alert('모든 문항의 답을 체크해주세요.')
      return
    }

    try {

      const requestData = selectedExamples.map(e => e.exampleData)

      const res = await axios.post(`http://localhost:8080/submit/${id}/${assignmentId}`, 
        requestData
      , {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      if(res.data.data === '제출 성공') {
        alert('제출 완료')
        navigate(`/assignments/${id}`, { replace: true });
      }else{
        alert('실패')
      }
    }catch(err) {
      console.log(err)
    }
    
  };

  return (
    <div className="assignment-detail-container">
      <h2 className="assignment-detail-heading">과제</h2>
      {(!questions || questions.length === 0) && <p>Loading questions...</p>}

      
      {questions.map((question, index) => (
        <div key={index} className="assignment-detail-question-block">
          <h3 className="assignment-detail-question-title">{question.questionContent}</h3>
          <div className="assignment-detail-examples">
            {question.examples.map((example, i) => (
              <div
                key={i}
                className={`assignment-detail-example-item ${selectedAnswers[question.questionContent] === i ? 'assignment-detail-selected' : ''}`}
                onClick={() => {handleAnswerSelect(question.questionContent, i, example)

                }}
              >
                <span className="assignment-detail-example-content">{example.exampleContent}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="assignment-detail-submit-button" onClick={handleSubmit}>제출하기</button>
    </div>
  );
  
};

export default AssignmentsDetail;
