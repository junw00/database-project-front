import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './MaterialDetail.css';
import axios from 'axios';
import { useParams } from'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const MaterialDetail = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { id, materialId } = useParams();
  const [materialDetail, setMaterialDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMaterialDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/material/detail/${id}/${materialId}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setMaterialDetail(res.data.data)
      console.log("All materials:", res.data.data);
    } catch (error) {
      console.error('Error fetching notice detail:', error);
    }
  };

  fetchMaterialDetail();
}, [id, materialId]);

  if (!materialDetail) {
    return <div>자료를 찾을 수 없습니다.</div>;
  }

  const file_path = materialDetail.filePath || null;

  // 예시 데이터 (실제로는 props나 API 호출을 통해 받아올 수 있습니다)
  // const materialData = {
  //   title: "데이터베이스 설계",
  //   content: "이 PDF는 데이터 모델링에 대한 포괄적인 개요를 제공합니다. 주요 내용으로는 데이터 모델링의 기본 개념과 단계, Chen의 ERD 표기법을 포함한 개념적 모델링, IE와 Crow's foot 표기법을 사용한 논리적 모델링, TDM 도구를 이용한 개념적 및 논리적 모델링 방법, 일반화 개념, 그리고 실제 데이터 모델링 연습 문제를 다룹니다. 또한 다양한 데이터베이스 설계 도구에 대한 정보와 물리적 뷰 생성 방법도 포함하고 있습니다.",
  //   upload_date: "2024-12-13",
  //   modification_date: null
  //   };

  // 다운로드
  const handleDownload = () => {
    const pdfUrl = file_path; // PDF 파일의 URL
    const fileName = pdfUrl.split('/').pop(); // URL에서 파일 이름과 확장자 추출
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName; // 다운로드될 파일의 이름을 기존 파일 이름으로 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(1);
  };

  const onPageNumberChange = (e) => {
    const newPageNumber = parseInt(e.target.value);
    if (newPageNumber > 0 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
    }
  };

  return (

    <div className="material-detail">

      {/* 제목 */}
      <h2 className="material-detail__title">제목: {materialDetail.title}</h2>

      {/* 내용 */}
      <div className="material-detail__content">
        <h3>수업 자료 내용:</h3>
        <p>{materialDetail.content}</p>
      </div>

      {/* 업로드 날짜 */} 
      <div className="material-detail__upload-date">
        업로드 날짜: {materialDetail.modification_date ? materialDetail.modification_date : materialDetail.upload_date}
      </div>

      <div className="material-detail__pdf-container">

        {/* 다운로드 */}
      <button onClick={handleDownload} className="material-detail__download-button">다운로드</button>

      {file_path ? (
          <>
        {/* 페이지 컨트롤 */}
        <div className="material-detail__page-controls">
          <button 
            className="material-detail__button" 
            onClick={changePageBack} 
            disabled={pageNumber <= 1}
          >
            이전
          </button>
          <span className="material-detail__page-info">
            Page <input 
              className="material-detail__page-input"
              type="number" 
              value={pageNumber} 
              onChange={onPageNumberChange}
              min={1} 
              max={numPages} 
            /> of {numPages}
          </span>
          <button 
            className="material-detail__button" 
            onClick={changePageNext} 
            disabled={pageNumber >= numPages}
          >
            다음
          </button>

        </div>

        {/* pdf 뷰어 */}
        <Document
              file={file_path}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </>
        ) : (
          <p></p>
        )}

      </div>

    </div>
  );
};

export default MaterialDetail;
