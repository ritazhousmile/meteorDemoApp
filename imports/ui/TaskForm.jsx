import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const TaskForm = () => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!task.trim()) return;
        try {
            await Meteor.callAsync('tasks.insert', task.trim());
            setTask("");
        } catch (error) {
            console.error('Error inserting task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
                <input 
                    type="text" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task..."
                    className="task-input"
                    required
                />
                <button type="submit" className="task-button">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;