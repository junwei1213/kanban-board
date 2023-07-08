import React from 'react';

const Stage = ({ stageName, tasks, onSelectTask }) => {
  const style = {
    display: 'inline-flex',
    flexDirection: 'column',
    border: '1px solid gray',
    padding: '1em',
    marginRight: '1em',
    marginBottom: '1em',
    width: 'calc(100% - 1em)', // subtract margins
    boxSizing: 'border-box',
  };
  // responsive adjustments
  if (window.innerWidth > 768) {
    // adjust threshold as needed
    style.width = 'calc(25% - 1em)'; // 4 stages => 25% width each
  }

  return (
    <div data-testid={`stage-${stageName}`} style={style}>
      <h2>{stageName}</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tasks.map((task, index) => (
          <div
            key={index}
            onClick={() => onSelectTask(task, stageName)}
            style={{
              border: '1px solid gray',
              padding: '8px',
              marginBottom: '8px',
              cursor: 'pointer',
            }}
          >
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stage;
