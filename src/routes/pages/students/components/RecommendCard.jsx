import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecommendCard = ({dunning, id, title, startDate, endDate, recommendState, participantNum }) => {
    const [borderClass, setBorderClass] = useState('');

    useEffect(() => {
        // Set border class based on recommendState

        if(recommendState === '읽음') {
            if(dunning) {
                setBorderClass('dunning')
            }
        }

        if (recommendState === '안읽음') {
            setBorderClass('unread-border');
            if(dunning) {
                setBorderClass('dunning')
            }
            
        } else if (recommendState === '신청 완료') {
            setBorderClass('completed-border'); // Define a CSS class for green border
        } else {
            setBorderClass('default-border');
        }
    }, [recommendState]);

    return (
        <Link to={`/recommend/${id}`} key={id}>
            <div className={`program-list-card ${borderClass}`}>
                {recommendState === '안읽음' ? '새로운 추천이 도착했습니다.' : '추천 상태 확인'}
                <h3>{title}</h3>
                <p>{startDate} ~ {endDate}</p>
                <p>신청 가능 인원: {participantNum}</p>
            </div>
        </Link>
    );
};

export default RecommendCard;
