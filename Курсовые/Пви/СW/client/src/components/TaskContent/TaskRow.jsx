import React from 'react';
import { setTaskMy,unsetTaskMy } from '../../services/apiTask';

const handleAddToMyTasks = (task, onTaskUpdate) => {
    setTaskMy(task)
    .then(data => {
        console.log(data);
        onTaskUpdate();
    })
    .catch(error => {
        console.error(error);
    });
};


const handleRemoveFromMyTasks = (task, onTaskUpdate) => {
    unsetTaskMy(task)
    .then(data => {
        console.log(data);
        onTaskUpdate();
    })
    .catch(error => {
        console.error(error);
    });

};

const TaskRow = ({ task, type, onTaskUpdate }) => {
    return (
        <div>
            
            <div key={task.id} style={{display:"flex", width:"100%",}}>
                <h3>{task.title}</h3>
                    <p><strong>Project ID:</strong> {task.projectId}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Description:</strong> {task.description}</p>
                    <p><strong>ID:</strong> {task._id}</p>
                    {type === 'all'&& task.status !== 'taken' && <button onClick={() => handleAddToMyTasks(task, onTaskUpdate)}>Add to My Tasks</button>}
                    {type === 'my' && <button onClick={() => handleRemoveFromMyTasks(task, onTaskUpdate)}>Remove from My Tasks</button>}
            </div>
        </div>
    );
};

export default TaskRow;
