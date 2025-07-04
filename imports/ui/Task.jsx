import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
    return (
        <li className={`task-item ${task.isChecked ? 'completed' : ''}`}>
            <div className="task-content">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={!!task.isChecked}
                        onChange={() => onCheckboxClick(task)}
                        className="task-checkbox"
                    />
                    <span className="checkmark"></span>
                </label>
                <span className={`task-text ${task.isChecked ? 'completed-text' : ''}`}>
                    {task.text}
                </span>
            </div>
            <button 
                onClick={() => onDeleteClick(task)} 
                className="delete-button"
                title="Delete task"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                </svg>
            </button>
        </li>
    );
};