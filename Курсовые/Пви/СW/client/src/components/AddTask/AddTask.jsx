import React, { useState, useEffect } from 'react';
import './AddTask.css';
import {getProjects} from '../../services/apiProjects';
import {createEvent} from '../../services/apiEvents';
<<<<<<< HEAD

const AddTask = () => {
=======
import { getTask } from '../../services/apiTask';
import  Alert  from '../Alert/Alert.js';
import { getEvents } from '../../services/apiEvents';
const AddTask = ({setEvents}) => {
    
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
    const [inputValue, setInputValue] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSendDisabled, setIsSendDisabled] = useState(true);
    const [projects, setProjects] = useState([]);
    const [timerStart, setTimerStart] = useState(0);
<<<<<<< HEAD

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
=======
    const [loading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState([]);
    const [task, setTask] = useState([]);
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
    const [selectedProjectId, setSelectedProjectId] = useState('');

    const handleProjectChange = (event) => {
        let index = event.target.selectedIndex - 1;
        if (index === 0) {
            setSelectedProjectId("");
            return;
        }
        setSelectedProjectId(projects[index].projcetid);
    };
<<<<<<< HEAD

    useEffect(() => async () =>{
=======
    useEffect(() => async () => {
        setLoading(true);
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
        // Fetch projects from the database
        let affa = [];
        try {
            affa = await getProjects();
        } catch (error) {
            console.log();
        }
        let tasks = [];
        try {
            tasks = await getTask();
        } catch (error) {
            console.log();
        };
        setProjects(affa.map((project) => ({
            id: project.__v,
            projcetid: project._id,
            title: project.title,
        })));
        setTask(tasks.map((task) => ({
            id: task.__v,
            taskid: task._id,
            title: task.title,
        })));
        setLoading(false);
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning])
    useEffect(() => {
        setIsSendDisabled(timer === 0);
    }, [timer]);
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return ` ${hours}:${minutes}:${seconds}`;
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleButtonClick = () => {
        if (!isRunning) {
            let time = new Date().toISOString();
            setStartTime(time);
        }
<<<<<<< HEAD

        if (isRunning) {
            handleSendButtonClick();
        }
       
        setIsRunning((isRunning) => !isRunning);
    };


=======
        if (isRunning) {
            handleSendButtonClick();
        }
            setIsRunning((isRunning) => !isRunning);
    };
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
    const handleSendButtonClick = () => {
        const event = {
            name: inputValue,
            startTime: startTime,
            endTime: new Date().toISOString(),
            projectid: selectedProjectId, 
        };

<<<<<<< HEAD
            // Convert event object to JSON
        
        createEvent(event)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
=======
        createEvent(event)
            .then((response) => {
                setTimer(0);
                Alert.fire({
                    title: 'Задача создана!',
                    text: 'Задача успешно создана!',
                    icon: 'success',
                    confirmButtonText: 'Ок',
                })
                getEvents()
                    .then((data) => {
                        setEvents(data);
                    })
                    .catch((error) => {
                       
                        console.log(error);
                    });
            })
            .catch((error) => {
                Alert.fire({
                    title: 'Ошибка!',
                    text: 'Ошибка создания задачи!\n' + error.message,
                    icon: 'error',
                    confirmButtonText: 'Ок',
                });
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
            });
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (


        <div id='task'>
            


            <input  
                list="dataiput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
<<<<<<< HEAD
                placeholder="Над чем вы работаете? " />
            <select onChange={handleProjectChange}>
                <option value="">Выберите проект</option>
                {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                        {project.title}
=======
                placeholder="Над чем вы работаете? "
                />
            <datalist id="dataiput">
                {task.map((tas) => (
                    <option key={tas.title} value={tas.title}>
                       
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
                    </option>
                ))}
            </datalist>
            <select onChange={handleProjectChange}>               
                <option value="">Выберите проект</option>
                {projects.map((project) => (
                <option key={project.projcetid} value={project.projcetid}>
                    {project.title}
                </option>
                ))}
            </select>
<<<<<<< HEAD
            <button onClick={handleButtonClick} >
                {isRunning ? 'Stop' : 'Start'}
            </button>

            <p>Timer: {formatTime(timer)}</p>
        </div>
    );
=======
            <button onClick={handleButtonClick} disabled={!inputValue.trim()} >
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <div id='timer'> {formatTime(timer)}</div>
        </div>);
>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
};
        
export default AddTask;

