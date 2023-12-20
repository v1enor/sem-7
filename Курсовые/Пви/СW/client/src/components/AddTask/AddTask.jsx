import React, { useState, useEffect } from 'react';
import './AddTask.css';
import {getProjects} from '../../services/apiProjects';
import {createEvent} from '../../services/apiEvents';

const AddTask = () => {
    const [inputValue, setInputValue] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSendDisabled, setIsSendDisabled] = useState(true);
    const [projects, setProjects] = useState([]);
    const [timerStart, setTimerStart] = useState(0);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
    const [selectedProjectId, setSelectedProjectId] = useState('');

    const handleProjectChange = (event) => {
        let index = event.target.selectedIndex - 1;
        if (index === 0) {
            setSelectedProjectId("");
            return;
        }
        setSelectedProjectId(projects[index].projcetid);
    };

    useEffect(() => async () =>{
        // Fetch projects from the database
        let affa = await getProjects();
        
        setProjects(affa.map((project) => ({
            id: project.__v,
            projcetid: project._id,
            title: project.title,
        })));
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        setIsSendDisabled(timer === 0);
    }, [timer]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (!isRunning) {
            let time = new Date().toISOString();
            setStartTime(time);
        }

        if (isRunning) {
            handleSendButtonClick();
        }
       
        setIsRunning((isRunning) => !isRunning);
    };


    const handleSendButtonClick = () => {
        const event = {
            name: inputValue,
            startTime: startTime,
            endTime: new Date().toISOString(),
            projectid: selectedProjectId, 
        };

            // Convert event object to JSON
        
        createEvent(event)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isButtonDisabled = inputValue === '';

    return (
        <div id='task'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Над чем вы работаете? " />
            <select onChange={handleProjectChange}>
                <option value="">Выберите проект</option>
                {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                        {project.title}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick} >
                {isRunning ? 'Stop' : 'Start'}
            </button>

            <p>Timer: {formatTime(timer)}</p>
        </div>
    );
};

export default AddTask;

