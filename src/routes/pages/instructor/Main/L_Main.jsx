import React, { useEffect, useState } from "react";
import styles from './L_Main.module.css';
import Header from "../../../../Components/Header";
import Bar from "../../../../Components/Bar";
import axios from "axios";


const LecturerMain = () => {
    const[l_program, setL_program] = useState([])

    useEffect(() => {

        const getProgram = async () => {

            try {
                const res = await axios.get('http://localhost:8080/instructor/program', {
                    headers: {'Content-Type': 'application/json'}, 
                    withCredentials: true
                })
                const activePrograms = res.data.data.filter(program => program.operationStatus === '운영중');
                setL_program(activePrograms);
                console.log(activePrograms);
            }catch(err) {
                console.log(err)
            }
            
        }
        
        getProgram()
    },[])

    return (
        <div>
            <Header/>
            <div className={styles.back}>
                <div className={styles.container}>
                    <div className={styles.txtbtn}>비교과 프로그램</div>
                    <div className={styles.choosebtn}>학기 데이터</div>
                </div>
                <div className={styles.redtxt}>프로그램 수</div>

                {l_program.map((program, idx) => (
                    <Bar key={program.id} program={program}/>
                ))}
                <div className={styles.under}>
                    <div className={styles.alert}>
                    <div   div className={styles.alert_header}>
                            <div className={styles.alert_txt}>학생 참여 알림창</div>
                        </div>
                        <div className={styles.alert_body}>
                            <div className={styles.box}>
                            </div>
                            <div className={styles.notice_txt}>
                                <div className={styles.txt}>
                                    <img className={styles.notice} src="/img/alert.png" alt="alerticon"></img>
                                    알림사항 들어갈 자리
                                    <img className={styles.detail} src="/img/detail.png" alt="detailicon"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.alert2}>
                    <div   div className={styles.alert_header}>
                            <div className={styles.alert_txt}>학생 참여 알림창</div>
                        </div>
                        <div className={styles.alert_body}>
                            <div className={styles.box}></div>
                            <div className={styles.start_line}></div>
                            <div className={styles.message}>
                                <div className={styles.profile}></div>
                                <div className={styles.name}>김송원</div>
                                <div className={styles.chat}>메세지 내용</div>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.message}>
                                <div className={styles.profile}></div>
                                <div className={styles.name}>김송원</div>
                                <div className={styles.chat}>메세지 내용</div>
                            </div>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LecturerMain;