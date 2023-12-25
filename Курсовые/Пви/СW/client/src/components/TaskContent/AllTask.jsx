import React, { useEffect, useState } from 'react';
import TaskRow from './TaskRow';
import { getTask, getTaskByProjects } from '../../services/apiTask';
import { getProjects } from '../../services/apiProjects';


const AllTask = (user) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alltasks, setAllTasks] = useState([]);
    const [projectmanlist, setprojectmanlist] = useState([]);

    useEffect(() => {
        getTaskByProjects()
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
        getTask()
            .then(data => {
                setAllTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
        getProjects()
            .then(data => {
                setprojectmanlist(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const handleTaskUpdate = () => {
        // Здесь вы можете повторно вызвать getTask для обновления списка задач
        getTaskByProjects()
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
        getTask()
            .then(data => {
                setAllTasks(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
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


    const finishedTask = alltasks.filter(task => task.status === 'finished');
    const userTask = tasks.filter(task => task.assignedTo === user.user.login).filter(task => task.status !== 'finished');
    const unassignedTask = tasks.filter(task => task.status !== 'finished');

    if (unassignedTask.length <= 0 && userTask.length <= 0 && finishedTask.length <= 0) {
        return <div>Нет объектов!</div>;
    }

    return (
        <div id='TaskList'>
            <h2 id="taskH">Задачи</h2>    
            <div class="Task">

            {unassignedTask.length > 0  && (
                Object.entries(tasksByProjectId).map(([projectId, projectData]) => (
                    <div key={projectId}>
                        <h2>Проект ID: {projectId} Название: {projectData.projectTitle} </h2>
                    {projectData.tasks.filter(task => task.status !== 'finished').map(task => (
                        <TaskRow isEdit={projectmanlist.some(project => project._id === projectId)} 
                            key={task.id} task={task} onTaskUpdate={handleTaskUpdate} type="all" />
                    ))}
                </div>
            ))
            )}</div>


            <h2 class="taskH">Мои задачи</h2>
            <div class="Task">

            {userTask.length > 0 && (
                
                Object.entries(tasksByProjectId).map(([projectId, projectData]) => (
                    <div key={projectId}>
                        <h2>Проект ID: {projectId} Название: {projectData.projectTitle} </h2>
                        {projectData.tasks.filter(task => task.assignedTo === user.user.login).filter(task => task.status !== 'finished')
                            .map(task => (
                                <TaskRow  isEdit={projectmanlist.some(project => project.projectId === projectId)}  key={task.id} task={task} onTaskUpdate={handleTaskUpdate} type="my" />
                                ))}
                </div>
                
                ))
                )}        
            </div>


            {finishedTask.length > 0 && (
                <>
                    <h2 class="taskH">Завершенные задачи</h2>
                    <div class="Task">

                    {finishedTask.map(task => (
                        <TaskRow 
                            key={task.id} task={task} onTaskUpdate={handleTaskUpdate} type="finished" />
                    ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllTask;