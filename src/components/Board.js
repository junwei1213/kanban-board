import React from 'react';
import Stage from './Stage';

const Board = ({ stagesTasks, onSelectTask }) => {
  if (!stagesTasks) {
    return null; // Return null or a fallback component if stagesTasks is undefined or null
  }

  const stages = Object.keys(stagesTasks);

  return (
    <div>
      <h1>Kanban Board</h1>
      {stages.map((stage, index) => (
        <Stage
          key={index}
          stageName={stage}
          tasks={stagesTasks[stage]}
          onSelectTask={onSelectTask} // Pass the onSelectTask function directly
        />
      ))}
    </div>
  );
};

export default Board;
