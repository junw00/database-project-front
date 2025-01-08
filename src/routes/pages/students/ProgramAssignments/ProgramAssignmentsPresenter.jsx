
import React, { useEffect, useState } from 'react';
import './ProgramAssignments.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProgramAssignmentsPresenter = () => {
    
    const [assignment, setAssignment] = useState([])
    const assignmentDate = {
    title: ['1', '2', '3'],
    total: [4, 5, 6],
    deadline_date: ['2024-10-01', '2024-10-01', '2024-10-01'],
    };

    const {id} = useParams()

    useEffect(() => {
        const getAssignments = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/assignments/${id}`, {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                })
                setAssignment(res.data.data)
                console.log(res.data.data)
            }catch(err) {
                console.log(err)
            }
            
        }

        getAssignments()
    }, [])

    console.log(assignment)
    return (
    
        <div className="assignment-container">
        {assignment.map((a, index) => {
          const deadlineDate = new Date(a.deadlineDate);
          const currentDate = new Date();
          const isPastDeadline = deadlineDate < currentDate;

        return (
          <Link to={`/program/${id}/assignment/${a.id}`} key={a.id}>
            <div 
              className={`assignment-card ${!a.completed ? "incomplete" : ""} ${isPastDeadline ? "past-deadline" : ""}`}
            >
              <h3 className="assignment-title">{a.assignmentTitle}</h3>
              {isPastDeadline ? <p className='assignment-total'>기간이 지났습니다.</p> : null}
              <p className="assignment-total">Total: {a.totalQuestion <= 5 ? a.totalQuestion : 5}</p>
              <p className="assignment-upload-date">DeadLine: {a.deadlineDate}</p>
            </div>
          </Link>
        )})}
      </div>
      

        );
    };

export default ProgramAssignmentsPresenter;
