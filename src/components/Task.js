import React from 'react';

const taskNameToId = name => {
  return `task-${name}`;
}

const Task = ({ name }) => {
  return (
    <div     
      data-testid={taskNameToId(name)}
    >
    <p>{name}</p>
    </div>
  );
}

export default Task;
