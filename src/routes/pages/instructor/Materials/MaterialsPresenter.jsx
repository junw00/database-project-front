import React, { useState } from 'react';
import './MaterialsPresenter.css';
import ProgramHomeHeader from '../../students/components/ProgramHome/ProgramHomeHeader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import { Link } from 'react-router-dom';

const MaterialsPresenter = () => {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: '',
      content: ''
    }
  ]);
  const [deadline, setDeadline] = useState(new Date('2024/12/18'));

  const handleAddMaterial = () => {
    setMaterials(prev => [...prev, {
      id: materials.length + 1,
      title: '',
      content: ''
    }]);
  };

  const handleRemoveMaterial = (id) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const handleMaterialChange = (id, field, value) => {
    setMaterials(prev => 
      prev.map(m => {
        if (m.id === id) {
          return { ...m, [field]: value };
        }
        return m;
      })
    );
  };

  return (
    <>
      <ProgramHomeHeader/>
      <div className="materials-form">
        <div className="category-tabs">
          <Link to = "/pjhnotice"><button className="tab">공지사항</button></Link>
          <Link to = "/pjhassignment"><button className="tab">과제</button></Link>
          <Link to = "/pjhmaterials"><button className="tab active">강의자료</button></Link>
          <Link to = "/pjhsurvey"><button className="tab">만족도 조사</button></Link>
        </div>
        <div className="book-title">
          <span>📝 모바일 환경의 발전</span>
        </div>
        <div className="deadline">
          
        </div>
        <div className="materials-count">
          <span>총 자료 수: {materials.length}</span>
          <button onClick={handleAddMaterial}>+</button>
          <button onClick={() => materials.length > 1 && handleRemoveMaterial(materials[materials.length - 1].id)}>-</button>
        </div>
        <form>
          {materials.map((m, index) => (
            <div key={m.id} className="material-box">
              <div className="material-header">
                <h3>자료 {index + 1}</h3>
                <button type="button" className="remove-btn" onClick={() => handleRemoveMaterial(m.id)}>×</button>
              </div>
              <input
                type="text"
                className="material-title-input"
                placeholder="자료 제목을 입력하세요"
                value={m.title}
                onChange={(e) => handleMaterialChange(m.id, 'title', e.target.value)}
              />
              <textarea
                className="material-content-input"
                placeholder="자료 내용을 입력하세요"
                value={m.content}
                onChange={(e) => handleMaterialChange(m.id, 'content', e.target.value)}
              />
              <div className="file-upload">
                <input type="file" id={`file-${m.id}`} className="file-input" />
                <label htmlFor={`file-${m.id}`} className="file-label">파일 첨부</label>
              </div>
            </div>
          ))}
          <button type="submit" className="submit-btn">등록하기</button>
        </form>
      </div>
    </>
  );
};

export default MaterialsPresenter;