import React, { useState, useEffect } from 'react';
import './AddTask.css';
import {getProjects} from '../../services/apiProjects';

const AddTask = () => {
    const [inputValue, setInputValue] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isSendDisabled, setIsSendDisabled] = useState(true);
    const [projects, setProjects] = useState([]);
    const [timerStart, setTimerStart] = useState(0);
    useEffect(() => async () =>{
        // Fetch projects from the database
        let affa = await getProjects();
        
        setProjects(affa.map((project) => ({
            id: project.__v,
            name: project.title,
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

        setIsRunning((prevIsRunning) => !prevIsRunning);
        if (!isRunning) {
            handleSendButtonClick();
        }
    };

    const handleSendButtonClick = () => {
        // Send the task
    };

    const isButtonDisabled = inputValue === '';

    return (
        <div id='task'>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Над чем вы работаете? "
            />
            <select>
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.title}
                    </option>
                ))}
            </select>
            <button onClick={handleButtonClick} disabled={isButtonDisabled}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            {timer !== 0 && (
                <button onClick={handleSendButtonClick} disabled={isSendDisabled}>
                    Send
                </button>
            )}
            <p>Timer: {formatTime(timer)}</p>
        </div>
    );
};

export default AddTask;

