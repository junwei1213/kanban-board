import React, { Component } from 'react';
import './App.css';

import Controls from './components/Controls';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stagesTasks: {
        Backlog: ['task 0', 'task 1', 'task 2', 'task 3'],
        'To Do': ['task 4', 'task 5', 'task 6'],
        Ongoing: ['task 7', 'task 8'],
        Done: ['task 9'],
      },
      selectedTaskName: '',
      selectedStageIndex: -1,
    };
  }

  handleCreateTask = (newTaskName) => {
    this.setState((prevState) => {
      const updatedStagesTasks = {
        ...prevState.stagesTasks,
        Backlog: [...prevState.stagesTasks['Backlog'], newTaskName],
      };
      return {
        stagesTasks: updatedStagesTasks,
      };
    });
  };

  handleSelectTask = (taskName, stageName) => {
    const stages = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    const stageIndex = stages.indexOf(stageName);
    this.setState({
      selectedTaskName: taskName,
      selectedStageIndex: stageIndex,
    });
  };

  handleMoveBack = () => {
    this.setState((prevState) => {
      const { selectedTaskName, selectedStageIndex, stagesTasks } = prevState;
      const stages = Object.keys(stagesTasks);

      // If the selected task is already in the first stage, don't move it
      if (selectedStageIndex === 0) {
        return prevState;
      }

      // Remove the task from the current stage
      const currentStageTasks = stagesTasks[stages[selectedStageIndex]].filter(
        (task) => task !== selectedTaskName
      );

      // Add the task to the previous stage
      const previousStageTasks = [
        ...stagesTasks[stages[selectedStageIndex - 1]],
        selectedTaskName,
      ];

      return {
        ...prevState,
        stagesTasks: {
          ...stagesTasks,
          [stages[selectedStageIndex]]: currentStageTasks,
          [stages[selectedStageIndex - 1]]: previousStageTasks,
        },
        selectedStageIndex: selectedStageIndex - 1,
      };
    });
  };

  handleMoveForward = () => {
    this.setState((prevState) => {
      const { selectedTaskName, selectedStageIndex, stagesTasks } = prevState;
      const stages = Object.keys(stagesTasks);

      // If the selected task is already in the last stage, don't move it
      if (selectedStageIndex === stages.length - 1) {
        return prevState;
      }

      // Remove the task from the current stage
      const currentStageTasks = stagesTasks[stages[selectedStageIndex]].filter(
        (task) => task !== selectedTaskName
      );

      // Add the task to the next stage
      const nextStageTasks = [
        ...stagesTasks[stages[selectedStageIndex + 1]],
        selectedTaskName,
      ];

      return {
        ...prevState,
        stagesTasks: {
          ...stagesTasks,
          [stages[selectedStageIndex]]: currentStageTasks,
          [stages[selectedStageIndex + 1]]: nextStageTasks,
        },
        selectedStageIndex: selectedStageIndex + 1,
      };
    });
  };

  handleDeleteTask = () => {
    this.setState((prevState) => {
      const { selectedTaskName, selectedStageIndex, stagesTasks } = prevState;
      const stages = Object.keys(stagesTasks);

      // Remove the task from the current stage
      const currentStageTasks = stagesTasks[stages[selectedStageIndex]].filter(
        (task) => task !== selectedTaskName
      );

      return {
        ...prevState,
        stagesTasks: {
          ...stagesTasks,
          [stages[selectedStageIndex]]: currentStageTasks,
        },
        selectedTaskName: '',
        selectedStageIndex: -1,
      };
    });
  };

  render() {
    const { stagesTasks, selectedTaskName, selectedStageIndex } = this.state;

    return (
      <div className="App">
        <Controls
          createTask={this.handleCreateTask}
          selectedTaskName={selectedTaskName}
          selectedStageIndex={selectedStageIndex}
          onMoveBack={this.handleMoveBack}
          onMoveForward={this.handleMoveForward}
          onDeleteTask={this.handleDeleteTask}
          // Pass other needed props like onMoveTask, onDeleteTask, etc.
        />
        <Board stagesTasks={stagesTasks} onSelectTask={this.handleSelectTask} />
      </div>
    );
  }
}

export default App;
