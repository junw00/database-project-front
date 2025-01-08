import React, { useEffect, useState } from 'react';
import './ProgramNotice.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProgramNoticePresenter = () => {
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const getClassMaterial = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/material/${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                const allMaterials = res.data.data;
                // Filter to get only "수업자료"
                const filteredMaterials = allMaterials.filter(material => material.type === "공지사항");
                setMaterials(filteredMaterials);
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        getClassMaterial();
    }, [id]);

    return (
        <div className="ProgramNoticePresenter-container">
            <div className="notice-header">
                <div className="search-container">
                    <select className="notice-select">
                        <option>전체보기</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>작성자</option>
                    </select>
                    <input
                        type="text"
                        className="notice-search"
                        placeholder="검색어를 입력하세요"
                    />
                    <button className="search-button">검색</button>
                </div>
            </div>

            <div className="notice-list">
                {materials.map((material, index) => (

                    <Link to={`/material/detail/${id}/${material.id}`} key={index} className="notice-link">
                    <div
                        id={material.id}
                        key={index}
                        className={`notice-item ${material.read === '안읽음' ? 'unread-border' : ''}`}
                    >
                        <div className="notice-title">{material.title}</div>
                        {/* <div className="notice-content">{material.content}</div> */}
                        <div className="notice-date">{material.uploadDate}</div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProgramNoticePresenter;
