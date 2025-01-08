import React, { useEffect, useState } from 'react';
import './AssignmentPresenter.css';
import ProgramHomeHeader from '../../students/components/ProgramHome/ProgramHomeHeader';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import axios from 'axios';

const AssignmentPresenter = () => {

  const { id } = useParams()
  const [assignTitle, setAssignTitle] = useState('')
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      answer: 1
    }
  ]);
  const [deadline, setDeadline] = useState(new Date('2024/12/18'));

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      answer: 1
    }]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id, field, value, optionIndex) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === id) {
          if (field === 'option') {
            const newOptions = [...q.options];
            newOptions[optionIndex] = value;
            return { ...q, options: newOptions };
          }
          return { ...q, [field]: value };
        }
        return q;
      })
    );
  };

  const handleAddOption = (questionId) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId) {
          return { ...q, options: [...q.options, ''] };
        }
        return q;
      })
    );
  };

  const onClickUploadAssignment = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/assignments/${id}`, {
        questions: questions.map(q => ({
          question: q.question,
          options: q.options,
          answer: q.answer
        })),
        deadline: deadline,
        assignmentTitle: assignTitle
      }, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true
      })
      console.log(res)

      if(res.data.data) {
        window.location.href='http://localhost:3000/instructors'
      }
    }catch(err) {
      console.log(err)
    }
  }

  const [aa, AA] = useState([])
  useEffect(() => {

    const getProgram = async () => {

        try {
            const res = await axios.get('http://localhost:8080/instructor/program', {
                headers: {'Content-Type': 'application/json'}, 
                withCredentials: true
            })
            const activePrograms = res.data.data.filter(program => program.operationStatus === '운영중');
            AA(activePrograms)
  
        }catch(err) {
            console.log(err)
        }      
    }
    getProgram()
},[])
console.log(aa)

  return (
    <>
    <ProgramHomeHeader/>
    <div className="question-form">

      <div className="category-tabs">
          <Link to = "/pjhnotice"><button className="tab">공지사항</button></Link>
          <Link to = "/pjhassignment"><button className="tab active">과제</button></Link>
          <Link to = "/pjhmaterials"><button className="tab">강의자료</button></Link>
          <Link to = "/pjhsurvey"><button className="tab">만족도 조사</button></Link>
      </div>
      <div className="book-title">
        <span>📚 {aa.programTitle}</span>
      </div>
      <div className="deadline">
          <span>마감기한 설정: </span>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy/MM/dd"
            locale={ko}
            className="deadline-picker"
          />
        </div>
        <input type='text' onChange={(e) => setAssignTitle(e.target.value)}/>
      <div className="question-count">
        <span>총 문제 수: {questions.length}</span>
        <button onClick={() => handleAddQuestion()}>+</button>
        <button onClick={() => questions.length > 1 && handleRemoveQuestion(questions[questions.length - 1].id)}>-</button>
      </div>
      <div>
        {questions.map((q, qIndex) => (
          <div key={q.id} className="question-box">
            <div className="question-header">
              <h3>문제 {qIndex + 1}</h3>
              <button type="button" className="remove-btn" onClick={() => handleRemoveQuestion(q.id)}>×</button>
            </div>
            <input
              type="text"
              className="question-input"
              placeholder="문제를 입력하세요"
              value={q.question}
              onChange={(e) => handleQuestionChange(q.id, 'question', e.target.value)}
            />
            {q.options.map((option, index) => (
              <div key={index} className="option">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  checked={q.answer === index + 1}
                  onChange={() => handleQuestionChange(q.id, 'answer', index + 1)}
                />
                <input
                  type="text"
                  placeholder="답안을 입력하세요"
                  value={option}
                  onChange={(e) => handleQuestionChange(q.id, 'option', e.target.value, index)}
                />
              </div>
            ))}
            <button 
              type="button" 
              className="add-option-btn"
              onClick={() => handleAddOption(q.id)}
            >
              + 항목 추가
            </button>
          </div>
        ))}
        <button type="button" className="submit-btn" onClick={onClickUploadAssignment}>등록하기</button>
      </div>
    </div>
    </>
  );
};

export default AssignmentPresenter;