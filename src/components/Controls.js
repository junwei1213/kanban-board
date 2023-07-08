import React, { Component } from 'react';

class Controls extends Component {
  state = {
    newTaskName: '',
    stages: ['Backlog', 'To Do', 'Ongoing', 'Done'],
  };

  handleNewTaskInputChange = (event) => {
    this.setState({ newTaskName: event.target.value });
  };

  handleCreateTask = () => {
    const { newTaskName } = this.state;
    if (newTaskName) {
      const { createTask } = this.props;
      createTask(newTaskName);
      this.setState({ newTaskName: '' });
    }
  };

  render() {
    const { newTaskName } = this.state;
    const {
      selectedTaskName,
      selectedStageIndex,
      onMoveBack,
      onMoveForward,
      onDeleteTask,
    } = this.props;
    const isFirstStage = selectedStageIndex === 0;
    const isLastStage = selectedStageIndex === this.state.stages.length - 1;

    return (
      <div>
        <h1>Controls</h1>
        <input
          type="text"
          data-testid="new-task-name-input"
          placeholder="New task name"
          value={newTaskName}
          onChange={this.handleNewTaskInputChange}
        />
        <button
          data-testid="create-task-btn"
          disabled={!newTaskName}
          onClick={this.handleCreateTask}
        >
          Create
        </button>
        <br></br>
        <input
          type="text"
          data-testid="selected-task-field"
          placeholder="Selected task name"
          readOnly
          value={selectedTaskName}
        />
        <button
          data-testid="move-back-btn"
          disabled={!selectedTaskName || isFirstStage}
          onClick={() => onMoveBack('back')}
        >
          Move Back
        </button>
        <button
          data-testid="move-forward-btn"
          disabled={!selectedTaskName || isLastStage}
          onClick={() => onMoveForward('forward')}
        >
          Move Forward
        </button>
        <button
          data-testid="delete-btn"
          disabled={!selectedTaskName}
          onClick={onDeleteTask}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default Controls;
