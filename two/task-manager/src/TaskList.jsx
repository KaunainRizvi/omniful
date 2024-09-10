
import React from 'react';

const TaskList = ({ tasks, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ margin: '10px 0' }}>
          {task.text}
          <button onClick={() => onDeleteTask(task.id)} style={{ marginLeft: '10px' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
