import React, { useEffect, useState } from 'react';
import './ProgramMaterials.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProgramMaterialsPresenter = () => {
    const { id } = useParams();
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const getClassMaterial = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/material/${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                // 서버 응답에서 데이터만 저장
                const allMaterials = res.data.data; 
                console.log(allMaterials)
                // "수업자료"만 필터링
                const filteredMaterials = allMaterials.filter(material => material.type === "수업자료");
                setMaterials(filteredMaterials);
                
            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        getClassMaterial();
    }, [id]);

    return (
        <div className="ProgramMaterials-container">
            <div className="materials-list">
                {materials.map((material, index) => (
                    
                    <Link to={`/program/${id}/material/${material.id}`} className="material-link">
                    <div
                        key={index}
                        className={`material-item ${material.read === '안읽음' ? 'unread' : ''}`}
                    >
                        <div className="material-header-1">
                            <span className="material-icon">📝</span>
                            <span className="material-title">{material.title}</span>
                        </div>
                        <div className="material-info">
                            <span className="upload-date">{material.uploadDate}</span>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProgramMaterialsPresenter;
