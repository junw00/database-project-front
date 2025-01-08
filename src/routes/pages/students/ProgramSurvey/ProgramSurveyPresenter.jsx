import React from 'react';
import './ProgramSurvey.css'

const ProgramSurveyPresenter = () => {
    return(
        <div className="programsurveypresenter-container">
            <div className="survey-container">
                <div className="question-container">
                    <div className="question">
                        <span className="required">*</span>
                        <span className="number">1.</span>
                        <span className="text">해당 프로그램의 내용은 흥미롭고 유익했다고 생각하시나요?</span>
                    </div>
                    <div className="options">
                        <button className="option">매우만족</button>
                        <button className="option">만족</button>
                        <button className="option">보통</button>
                        <button className="option">불만족</button>
                        <button className="option">매우불만족</button>
                    </div>
                </div>

                <div className="question-container">
                    <div className="question">
                        <span className="required">*</span>
                        <span className="number">2.</span>
                        <span className="text">해당 프로그램의 설정된 목표를 달성했다고 느끼시나요?</span>
                    </div>
                    <div className="options">
                        <button className="option">매우만족</button>
                        <button className="option">만족</button>
                        <button className="option">보통</button>
                        <button className="option">불만족</button>
                        <button className="option">매우불만족</button>
                    </div>
                </div>

                <div className="question-container">
                    <div className="question">
                        <span className="required">*</span>
                        <span className="number">3.</span>
                        <span className="text">프로그램을 진행한 강사 또는 담당자의 진행에 만족하셨나요?</span>
                    </div>
                    <div className="options">
                        <button className="option">매우만족</button>
                        <button className="option">만족</button>
                        <button className="option">보통</button>
                        <button className="option">불만족</button>
                        <button className="option">매우불만족</button>
                    </div>
                </div>

                <div className="question-container">
                    <div className="question">
                        <span className="required">*</span>
                        <span className="number">4.</span>
                        <span className="text">프로그램에 참여한 이유나 동기가 충족되었나요?</span>
                    </div>
                    <div className="options">
                        <button className="option">매우만족</button>
                        <button className="option">만족</button>
                        <button className="option">보통</button>
                        <button className="option">불만족</button>
                        <button className="option">매우불만족</button>
                    </div>
                </div>

                <div className="question-container">
                    <div className="question">
                        <span className="required">*</span>
                        <span className="number">5.</span>
                        <span className="text">개선이 필요하다고 느낀 점이나 추가로 바라는 점이 있다면 자유롭게 작성해주세요.</span>
                    </div>
                    <textarea
                        className="feedback-input"
                        placeholder="내용을 작성해주세요"
                    />
                </div>

                <button className="submit-button">제출</button>
            </div>
        </div>
    )
}

export default ProgramSurveyPresenter
