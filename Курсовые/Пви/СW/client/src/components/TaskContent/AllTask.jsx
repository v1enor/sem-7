import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';
import { getTask } from '../../services/apiTask';

const AllTask = (user) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        getTask()
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleTaskUpdate = () => {
        // Здесь вы можете повторно вызвать getTask для обновления списка задач
        getTask()
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const tasksByProjectId = tasks.reduce((acc, task) => {
        if (!acc[task.projectId]) {
            acc[task.projectId] = {
                projectId: task.projectId,
                projectTitle: task.projectTitle,
                tasks: []
            };
        }
        acc[task.projectId].tasks.push(task);
        return acc;
    }, {});

    const tasksByUserId = tasks.filter(task => task.assignedTo === user.user.login);

    return (
        <div id='TaskList'>
            <h2>Задачи</h2>
            {Object.entries(tasksByProjectId).map(([projectId, projectData]) => (
            <div key={projectId}>
                <h2>Проект ID: {projectId} Название: {projectData.projectTitle} </h2>
                {projectData.tasks.map(task => (
                    <TaskRow key={task.id} task={task} onTaskUpdate={handleTaskUpdate} type="all"/>
                ))}
            </div>
            ))}
        

            <h2>Мои задачи</h2>
            {Object.entries(tasksByProjectId).map(([projectId, projectData]) => (
            <div key={projectId}>
                <h2>Проект ID: {projectId} Название: {projectData.projectTitle} </h2>
                {projectData.tasks.filter(task => task.assignedTo === user.user.login).map(task => (
                    <TaskRow key={task.id} task={task} onTaskUpdate={handleTaskUpdate} type="my"/>
                ))}
    </div>
))}
        </div>
    );
};

export default AllTask;