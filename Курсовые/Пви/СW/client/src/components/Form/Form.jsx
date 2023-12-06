import React, { useState } from 'react';
import './Form.css';

const Input = ({ event }) => {
    const [title, setTitle] = useState(event.title);
    const [project, setProject] = useState(event.project);
    const [command, setCommand] = useState(event.command);
    const [start, setStart] = useState(event.start);
    const [end, setEnd] = useState(event.end);
    const [date, setDate] = useState(event.date);

    const commands = ['Command 1', 'Command 2', 'Command 3']; // Add your commands here

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEvent = { title, project, command, start, end, date };
        // Do something with updatedEvent
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='div-event-part'>
                <div >
                    <label  htmlFor="title">Название:</label>
                    <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="project">Проект:</label>
                    <input id="project" type="text" value={project} onChange={e => setProject(e.target.value)} />
                </div>
            </div>
            <div className='div-event-part'>
                <div>
                    <label htmlFor="start">Начало:</label>
                    <input id="start" type="time" value={start} onChange={e => setStart(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="end">Конец:</label>
                    <input id="end" type="time" value={end} onChange={e => setEnd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="date">Дата:</label>
                    <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                    <button  type="submit">Подтвердить</button>
            </div>
        </form>
    );
};

export default Input;