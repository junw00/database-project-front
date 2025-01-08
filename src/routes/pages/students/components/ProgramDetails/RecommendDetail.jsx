import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, replace } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../../../Components/Header';
import './RecommendDetail.css';
import { tr } from 'date-fns/locale';

const RecommendDetail = () => {
    const [program, setProgram] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const { id } = useParams();
    const navigate = useNavigate()

    // const navigate = useNavigate();

    const handleBackPage = () => {
        navigate(-1);
    };

    const handleAcceptRecommendation = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/recommend/${id}`,{}, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            if(res.data.data === '이미 신청한 프로그램 입니다.') {
                alert(res.data.data);
                navigate('/')
            }else {
                alert('신청완료')
                navigate('/')
            }
            
            
            console.log(res.data.data)
        }catch(err) {
            console.log(err)
        }
        
    };

    const handleRejectRecommendation = async () => {
        try {

            const res = await axios.post(`http://localhost:8080/recommend/reject/${id}`, {
                rejectMessage: rejectReason
            } ,{
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })

            console.log(res.data.data)
            if(res.data.data === '이미 신청함') {
                alert('이미 신청한 프로그램입니다.')
                navigate('/')
            }
            if(res.data.data === '이미 신청한 프로그램 입니다.') {
                alert(res.data.data);
                navigate('/')
            }

            alert('추천이 거절되었습니다.');
            setShowRejectModal(false);
            navigate('/')
        } catch (error) {
            console.error('추천 거절 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/recommend`, {
                    withCredentials: true,
                });
                const selectedProgram = response.data.data.find((p) => p.id === parseInt(id));
                if (selectedProgram) {
                    setProgram(selectedProgram);
                } else {
                    console.log('Program not found for id:', id);
                }
            } catch (error) {
                console.error('프로그램 가져오기 오류:', error);
            }
        };

        fetchProgram();
    }, [id]);

    useEffect(() => {
        const read = async () => {
            try {
                const res = await axios.post(`http://localhost:8080/recommend/read/${id}`, {
                
                }, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                
            }catch(err) {
                console.log(err)
            }}
        read()
    }, [])

    if (!program) return <div>로딩 중...</div>;

    return (
        <div className="recommend-detail-container">
            <Header />
            <button className="recommend-detail-btn" onClick={handleBackPage}>
                뒤로가기
            </button>
            
            <h1 className='recommend-detail-title'>{program.programTitle}</h1>

            <img src={program.imagePath} className="recommend-detail-image" alt={program.programTitle} />

            <div className="recommend-detail-info">
                <h2>프로그램 정보</h2>
                <p>기간 유형: {program.durationType}</p>
                <p>시작일: {new Date(program.startDate).toLocaleDateString()} </p>
                <p>종료일: {new Date(program.endDate).toLocaleDateString()} </p>
                <p>모집 기간: {new Date(program.recruitmentPeriod).toLocaleDateString()}</p>
                <p>참가자 수: {program.participantNum}명</p>
                <p>대상 학생: {program.targetStudent}</p>
                <p>총 수업일: {program.totalClassDay}일</p>
                <p>년도: {program.year}</p>
                <p>학기: {program.semester}</p>
                <p>운영 상태: {program.operationStatus}</p>
            </div>

            <div className="recommend-detail-content">
                <h2>프로그램 내용</h2>
                <p>{program.programContent}</p>
            </div>

            <div className="recommend-detail-skills">
                <h2>개발 역량</h2>
                <p>창의성: {program.creativity}</p>
                <p>전문성: {program.expert}</p>
                <p> 글로벌: {program.global}</p>
                <p>끈기: {program.tenacity}</p>
                <p>포인트: {program.point} </p>
            </div>

            <div className="recommend-detail-status">
                <h2>프로그램 상태</h2>
                <p>추천 상태: {program.recommendState} </p>
                <p>총 과제 수: {program.totalAssignmentNum}</p>
            </div>

            {/* Accept and Reject Buttons */}
            <button onClick={handleAcceptRecommendation} className="recommend-recommend-btn">신청하기</button>

            {/* Reject Button */}
            <button onClick={() => setShowRejectModal(true)} className="recommend-reject-btn">거절하기</button>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="recommend-detail-modal">
                    <div className="recommend-detail-modal-content">
                        <h3>거절 사유 입력</h3>
                        
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)} />

                        <button className='recommend-detail-modal-btn' onClick={handleRejectRecommendation}>제출</button>
                        <button className='recommend-detail-modal-btn' onClick={() => setShowRejectModal(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecommendDetail;
