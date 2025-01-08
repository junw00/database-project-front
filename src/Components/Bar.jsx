import React, { useEffect, useState } from "react";
import styles from './Bar.module.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Bar = ({program}) => {
    // if (!program) {
    //     return null; // program이 없으면 아무것도 렌더링하지 않음
    // }





    // useEffect(() => {
    //     const getProgramInfo = async () => {
    //         const res = await axios.get(`http://localhost:8080/program/${id}`,{
    //             headers: {'Content-Type': 'application/jsoin'}
    //         })
    //         console.log(res.data.data)
    //         setProgramInfo(res.data.data)
    //     }

    //     getProgramInfo()
    // }, [])

    return (
        <div className={styles.Bar}>
            <div className={styles.bar_left}>
                <div className={styles.txtbtn}>{program.programTitle}</div> {/* 프로그램 제목 */}
                <div className={styles.txtbtn}>{program.durationType}</div> {/* 기간 유형 */}
                <div className={styles.txtbtn}>{program.operationStatus}</div> {/* 운영 상태 */}
            </div>
            <div className={styles.bar_right}>
        
            
                <Link to={`/pjhnotice/${program.id}`} ><button className="tab">공지사항</button></Link>
                <Link to={`/pjhassignment/${program.id}`}><button className="tab">과제</button></Link>
                <Link to={`/pjhmaterials/${program.id}`}><button className="tab">강의자료</button></Link>
                <Link to={`/pjhsurvey/${program.id}}`}><button className="tab">만족도 조사</button></Link>
                <Link to= {`/instructors/attendance/${program.id}`} id={program.id}><button className="tab">출결</button></Link>
      
            </div>
            {/* <div className={styles.projbtn}>
                <div className={styles.whitetxt}>
                    프로그램 홈 바로가기
                </div>
                <img className={styles.icon} src="/img/righticon.png" alt="바로가기" />
            </div> */}
        </div>
    );
}

export default Bar;
