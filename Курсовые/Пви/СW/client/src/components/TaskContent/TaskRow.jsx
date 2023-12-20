import React from 'react';
import { setTaskMy, unsetTaskMy, finishTask, updateTask } from '../../services/apiTask';

import './TaskRow.css';



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


const handleFinishTask = (task, onTaskUpdate) => {
    finishTask(task)
    .then(data => {
        console.log(data);
        onTaskUpdate();
    })
    .catch(error => {
        console.error(error);
    });

};


const TaskRow = ({ task, type, onTaskUpdate, isEdit }) => {


    const [updatedTask, setUpdateTask] = React.useState(task); 


    const handleUpadte = ( onTaskUpdate) => {
        updateTask(updatedTask)
        .then(data => {
            console.log(data);
            onTaskUpdate();
        })
        .catch(error => {
            console.error(error);
        });
    
    }
    

    const handleChange = (event, field) => {
        let value = event.target.value;
    
        setUpdateTask({ ...updatedTask, [field]: value });
    };



    return (
        <div className='projectInfo'>
            
            <div key={task.id}  className='projectInfo'>
    
                <strong>Проект ID:</strong>
                <input type="text" defaultValue= {task.projectId} readOnly size={10} />
                <strong>Статус:</strong> 
                <input type="text" defaultValue= {task.status} readOnly size={10} />
                   
                <strong>Описание:</strong> 
                <input type="text" defaultValue={task.description} size={10}
                onChange={(event) => handleChange(event, 'description')} />
                   
                <strong>Назначена:</strong> 
                <input type="text" defaultValue= {task.assignedTo}  readOnly size={10} />
                    {type === 'all'&& task.status !== 'taken' && <button onClick={() => handleAddToMyTasks(task, onTaskUpdate)}>В мои задачи</button>}
                    {type === 'my' && <button onClick={() => handleRemoveFromMyTasks(task, onTaskUpdate)}>Убрать из задач</button>}
                    {type === 'my' && <button onClick={() => handleFinishTask(task, onTaskUpdate)}>Закончить</button>}
                     {type === 'finished' && <button onClick={() => handleRemoveFromMyTasks(task, onTaskUpdate)}>А назад ее</button>}
                    {isEdit && <button onClick={() => handleUpadte(task, onTaskUpdate)}>Ред</button>}
            </div>
        </div>
    );
};

export default TaskRow;
