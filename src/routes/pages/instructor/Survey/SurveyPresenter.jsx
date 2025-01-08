import React, { useState } from 'react';
import './SurveyPresenter.css';
import ProgramHomeHeader from '../../students/components/ProgramHome/ProgramHomeHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import { Link } from 'react-router-dom';

const SurveyPresenter = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
    }
  ]);
  const [deadline, setDeadline] = useState(new Date('2024/12/18'));

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, {
      id: questions.length + 1,
      question: '',
    }]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === id) {
          return { ...q, question: value };
        }
        return q;
      })
    );
  };

  return (
    <>
      <ProgramHomeHeader/>
      <div className="survey-form">

        <div className="category-tabs">
          <Link to = "/pjhnotice"><button className="tab">공지사항</button></Link>
          <Link to = "/pjhassignment"><button className="tab">과제</button></Link>
          <Link to = "/pjhmaterials"><button className="tab">강의자료</button></Link>
          <Link to = "/pjhsurvey"><button className="tab active">만족도 조사</button></Link>
        </div>
        <div className="book-title">
          <span>👍 모바일 환경의 발전</span>
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
        <form>
          {questions.map((q, index) => (
            <div key={q.id} className="survey-question-box">
              <div className="survey-question-header">
                <span className="question-number">{index + 1}.</span>
                <input
                  type="text"
                  className="survey-question-input"
                  placeholder="질문을 입력하세요"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                />
              </div>
              {/* <div className="options-container">
                <div className="option">매우만족</div>
                <div className="option">만족</div>
                <div className="option">보통</div>
                <div className="option">불만족</div>
                <div className="option">매우불만족</div>
              </div> */}
            </div>
          ))}
          <div className="add-question-box" onClick={handleAddQuestion}>
            <span>+</span>
          </div>
          <button type="submit" className="survey-submit-btn">등록하기</button>
        </form>
      </div>
    </>
  );
};

export default SurveyPresenter;