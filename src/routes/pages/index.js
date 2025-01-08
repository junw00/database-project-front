import React from "react";

import {  Routes, Route } from "react-router-dom";

import DetailPresenter from "./professor/MyStudentInfo/DetailPresenter";
import RecommendationPresenter from "./professor/RequestRecommendation/RecommendationPresenter"; // Recommendation 페이지 추가

import RecommendationStatusPresenter from "./professor/RequestRecommendation/RecommendationStatusPresenter";
import MessageBoxPresenter from "./professor/MessageBox/MessageBoxPresenter";
import UnreadPresenter from "./professor/Unread/UnreadPresenter";
import StudentMainPresenter from "./students/Main/MainPresenter";


import ProgramHomeLayout from "./students/components/Layout/ProgramHomeLayout";
import ProgramHomePresenter from "./students/ProgramHome/ProgramHomePresenter";
import ProgramNoticePresenter from "./students/ProgramNotice/ProgramNoticePresenter";
import ProgramAssignmentsPresenter from "./students/ProgramAssignments/ProgramAssignmentsPresenter";
import ProgramMaterialsPresenter from "./students/ProgramMaterials/ProgramMaterialsPresenter";
import ProgramAttendancePresenter from "./students/ProgramAttendance/ProgramAttendancePresenter";
import ProgramSurveyPresenter from "./students/ProgramSurvey/ProgramSurveyPresenter";
import ProgramUserPresenter from "./students/ProgramUser/ProgramUserPresenter";

import ProfessorMainContainer from "./professor/Main";
import { Notice } from "./instructor/Notice";
import AssignmentPresenter from "./instructor/Assignment/AssignmentPresenter";
import { Materials } from "./instructor/Materials";
import { Survey } from "./instructor/Survey";


import { StudentLogin } from "./students/Login";
import ProfessorLoginContainer from "./professor/Login/ProfessorLoginContainer";
import ProgramNoticeDetail from "./students/components/ProgramDetails/NoticeDetail";
import ProgramMaterialDetail from "./students/components/ProgramDetails/MaterialDetail";
import AssignmentsDetail from "./students/components/ProgramDetails/AssignmentsDetail";
import OpenProgramList from "./students/components/OpenProgramList/OpenProgramList";
import ProgramDetail from "./students/components/ProgramDetails/ProgramDetail";
import InstructorLoginContainer from "./instructor/Login";
import LecturerMain from "./instructor/Main/L_Main";
import RecommendDetail from "./students/components/ProgramDetails/RecommendDetail";
import AttendanceList from "./instructor/Attendance/AttendanceList";
import Attendance from "./instructor/Attendance/components/Attendance";
import DateAttendance from "./instructor/Attendance/components/DateAttendance";


const Router = () => {
  return (
    <div className="app">
      <Routes>


        {/* 학생 페이지 */}
        <Route path="/" element={<StudentMainPresenter/>}/>
        <Route path="/program/list" element={<OpenProgramList />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/recommend/:id" element={<RecommendDetail/>} />
        <Route path="/student/login" element={<StudentLogin/>}/>
        {/*Program 페이지*/}
        <Route path="/" element={<ProgramHomeLayout />}>
          {/* 메인 페이지 */}
          <Route path="/program/:id" element={<ProgramHomePresenter />} />
          {/* 공지 페이지 */}
          <Route path="/notice/:id" element={<ProgramNoticePresenter />} />
          <Route path="/material/detail/:id/:materialId" element={<ProgramNoticeDetail />} />
          {/* 과제 페이지 */}
          <Route path="/assignments/:id" element={<ProgramAssignmentsPresenter />} />
          <Route path="/program/:id/assignment/:assignmentId" element={<AssignmentsDetail />} />
          {/* 수업 자료 페이지 */}
          <Route path="/materials/:id" element={<ProgramMaterialsPresenter/>} />
          <Route path="/program/:id/material/:materialId" element={<ProgramMaterialDetail />} />
          {/* 출석 페이지 */}
          <Route path="/attendance/:id" element={<ProgramAttendancePresenter />} />
          {/* 만족도조사 페이지 */}
          <Route path="/survey/:id" element={<ProgramSurveyPresenter />} />
          {/* 사용자 그룹 페이지 */}
          <Route path="/users/:id" element={<ProgramUserPresenter />} />    
        </Route>

        {/* 교수 페이지 */}
        <Route path="/professors" element={<ProfessorMainContainer />} /> {/* 메인 */}
        <Route path="/next-page" element={<DetailPresenter />} /> {/* 디테일 페이지 */}
        <Route path="/check" element={<RecommendationPresenter />} /> {/* 추천 요청 페이지 */}
        <Route path="/unread" element={<UnreadPresenter />} /> {/* 안읽음 메시지 */}
        <Route path="/recommendation-status" element={<RecommendationStatusPresenter />} /> {/* 지도학생 추천 현황 페이지 */}
        <Route path="/professor-login" element={<ProfessorLoginContainer />} /> {/* 로그인 */}
        

        {/* 공통 */}
        <Route path="/messages" element={<MessageBoxPresenter />} /> {/* 추가 */}

        {/* 강사 페이지 */}
        <Route path="/pjhassignment/:id" element={<AssignmentPresenter />} /> {/* 강사 과제 등록 페이지 */}
        <Route path="/pjhnotice/:id" element={<Notice />} /> {/* 강사 공지사항 등록 페이지 */}
        <Route path="/pjhmaterials/:id" element={<Materials />} /> {/* 강사 강의자료 등록 페이지*/}
        <Route path="/pjhsurvey/:id" element={<Survey />} /> {/* 강사 강의자료 등록 페이지*/}
        <Route path="/instructor-login/" element={<InstructorLoginContainer/>}></Route>
        <Route path="/instructors/" element={<LecturerMain/>}/>
        <Route path="/instructors/attendance/:programId" element={<AttendanceList />} />
        <Route path="/instructors/attendance/:id/edit" element={<Attendance />} />
        <Route path ="/instructors/attendance/:id/:date" element={<DateAttendance />} />

        

      </Routes>
    </div>

  );
};

export default Router;
