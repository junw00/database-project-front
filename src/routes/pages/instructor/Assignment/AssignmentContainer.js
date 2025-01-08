// AssignmentContainer.js
import React, { useState } from 'react';
import AssignmentPresenter from './AssignmentPresenter';

const AssignmentContainer = () => {
  const [totalPoints, setTotalPoints] = useState(5);
  

  return <AssignmentPresenter  totalPoints={totalPoints} />;
};

export default AssignmentContainer;