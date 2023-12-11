import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';
import { getTask } from '../../services/apiTask';

const MyTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleTaskUpdate = () => {
        getTask()
            .then(data => {
                setTasks(data);
            })
            .catch(error => {
                console.error(error);
    })};

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

    if (loading) {
        return <div>Loading...</div>;
    }

    const tasksByProjectId = tasks.reduce((acc, task) => {
        if (!acc[task.projectId]) {
            acc[task.projectId] = [];
        }
        acc[task.projectId].push(task);
        return acc;
    }, {});

    return (
        <div id='MyTaskList'>
            <h2>Мои задачи</h2>
            {Object.entries(tasksByProjectId).map(([projectId, tasks]) => (
                <div key={projectId}>
                    <h2>Project ID: {projectId}</h2>
                    {tasks.map(task => (
                        <TaskRow key={task.id} task={task}  onTaskUpdate={handleTaskUpdate} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyTask;