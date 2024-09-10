import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';


const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';


const addTask = (task) => ({ type: ADD_TASK, payload: task });
const deleteTask = (id) => ({ type: DELETE_TASK, payload: id });


const initialState = {
  tasks: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: Date.now(), text: action.payload }]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

const store = createStore(taskReducer);

// Lazy load TaskList component
const TaskList = lazy(() => import('./TaskList'));

const App = () => {
  const [task, setTask] = useState('');
  const [uncontrolledTask, setUncontrolledTask] = useState('');
  const taskInputRef = useRef(null);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  // Simulate fetching tasks when component mounts
  useEffect(() => {
    // Simulated fetch
    const fetchedTasks = [
      { id: 1, text: 'Learn React' },
      { id: 2, text: 'Learn Redux' },
      { id: 3, text: 'Build a Task Manager' }
    ];
    fetchedTasks.forEach(task => dispatch(addTask(task.text)));

    return () => {
      // Cleanup if needed
      console.log('Component unmounted');
    };
  }, [dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleAddUncontrolledTask = () => {
    if (uncontrolledTask.trim()) {
      dispatch(addTask(uncontrolledTask));
      setUncontrolledTask('');
      taskInputRef.current.value = '';
    }
  };

  return (
    <Provider store={store}>
      <div style={{ padding: '20px' }}>
        <h1>Task Manager</h1>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task"
            style={{ marginRight: '10px' }}
          />
          <button type="submit">Add Task</button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            ref={taskInputRef}
            onChange={(e) => setUncontrolledTask(e.target.value)}
            placeholder="Add a task (uncontrolled)"
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleAddUncontrolledTask}>Add Uncontrolled Task</button>
        </div>
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
        </Suspense>
      </div>
    </Provider>
  );
};

export default App;
