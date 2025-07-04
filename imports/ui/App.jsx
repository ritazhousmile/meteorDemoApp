import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Tasks } from '../api/TasksCollection.js';
import { Task } from './Task.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import TaskForm from './TaskForm.jsx';
import { LoginForm } from './LoginForm.jsx';



export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(
    () => {
      if(!user) {
        return 0;
      }
      return Tasks.find(hideCompletedFilter).count();
    }
  );

  const pendingTasksTitle = `${pendingTasksCount} ${pendingTasksCount === 1 ? 'task' : 'tasks'} pending`;



  const handleToggleChecked = ({_id, isChecked}) => {
    Meteor.callAsync('tasks.toggleChecked', _id, isChecked);
  };

  const handleDelete = ({_id}) => {
    Meteor.callAsync('tasks.delete', _id);
  };
  
  const { tasks, isLoading } = useTracker(() => {
    if(!user) {
      return {
        tasks: [],
        isLoading: false
      };
    }
    try {
      const handle = Meteor.subscribe('tasks');
      const tasksData = Tasks.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch();
      console.log('Subscription ready:', handle.ready());
      console.log('Tasks count:', Tasks.find({}).count());
      console.log('Tasks data:', tasksData);
      return {
        tasks: tasksData,
        isLoading: !handle.ready()
      };
    } catch (error) {
      console.error('Subscription error:', error);
      return {
        tasks: [],
        isLoading: false
      };
    }
  });
  
  console.log('Component render - isLoading:', isLoading, 'tasks count:', tasks.length);
  
  if (isLoading) {
    return <div>Loading... (Subscription not ready)</div>;
  }

  const logout = () => {
    Meteor.logout();
  };

  return (
    <div className="container">
      <h1>Welcome to MeteorDemoApp!</h1>
      {user ? (
        <div className="user-section">
          <p className="user-welcome">Welcome, {user.username}!</p>
          <button className="logout-button" onClick={logout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      ) : (
        <LoginForm />
      )}
      <TaskForm />
      <div className="filter-container">
        <button onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show Completed' : 'Hide Completed'}
        </button>
        <p>{pendingTasksTitle}</p>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks found. Check the console for debugging info.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <Task key={task._id} task={task} onCheckboxClick={handleToggleChecked} onDeleteClick={handleDelete} />
          ))}  
        </ul>
      )}
    </div>
  );
};
