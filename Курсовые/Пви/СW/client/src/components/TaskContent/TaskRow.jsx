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

            
            <div key={task.id}  className='projectInfo'>
            <div>
                <strong>Проект:</strong>
                <input type="text" defaultValue={task.projectId} readOnly size={3} />
            </div>
            <div>

                <strong>Название</strong>
                <input type="text" defaultValue={task.title} readOnly size={10} />
            </div>
            <div>
                <strong>Статус:</strong> 

                <input type="text" defaultValue={task.status} readOnly size={5} />
            </div>
            <div>

                <strong>Описание:</strong> 
            </div>
            <div>
            <input type="text" defaultValue={task.description} readOnly={!isEdit} size={10}
                onChange={(event) => handleChange(event, 'description')} />
            </div>  
            <div>
                <strong>Назначена:</strong> 
                <input type="text" defaultValue={task.assignedTo} readOnly size={6} />
            </div>
            <div id="btn">

                    {type === 'all'&& task.status !== 'taken' && <button onClick={() => handleAddToMyTasks(task, onTaskUpdate)}>В мои задачи</button>}
                    {type === 'my' && <button onClick={() => handleRemoveFromMyTasks(task, onTaskUpdate)}>Убрать из задач</button>}
                    {type === 'my' && <button onClick={() => handleFinishTask(task, onTaskUpdate)}>Закончить</button>}
                    {type === 'finished' && <button onClick={() => handleRemoveFromMyTasks(task, onTaskUpdate)}>А назад ее</button>}
                {isEdit && <button onClick={() => handleUpadte(task, onTaskUpdate)}>Редактировать</button>}
            </div>
        </div>

    );
};

export default TaskRow;
