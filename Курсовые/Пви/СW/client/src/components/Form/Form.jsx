import React, { useState } from 'react';
import './Form.css';
import { updateEvent } from '../../services/apiEvents';


const Input = ({ event }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState(event);


    const utcDate = new Date(event.startTime); // event.startTime должно быть в формате UTC
    const userTime = utcDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    
    const utcDateEnd = new Date(event.endTime); // event.startTime должно быть в формате UTC
    const userTimeEnd = utcDateEnd.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    // const startTime = event.startTime.split('T')[1].split('.')[0].slice(0, -3);
    // const endTime = event.endTime.split('T')[1].split('.')[0].slice(0, -3); 
   

    const handleEdit = () => {setIsEditing(true);};

    const handleSave = () => {
        updateEvent(updatedEvent)
        .then((data) => {
            console.log(data);
            
        })
        .catch((error) => {
            console.log(error);
        });

    };

    const handleChange = (event, field) => {

        if (field === 'startTime') {
            let up = new Date(updatedEvent.startTime);
            up.setHours(event.target.value.split(':')[0], event.target.value.split(':')[1]);
            setUpdatedEvent({ ...updatedEvent, [field] : up.toISOString() });

        }else if (field === 'endTime') {
            let up = new Date(updatedEvent.endTime);
            up.setHours(event.target.value.split(':')[0], event.target.value.split(':')[1]);
            setUpdatedEvent({ ...updatedEvent, [field] : up.toISOString() });
        }else if (field === 'date') {
            let up = new Date(updatedEvent.startTime);
            up.setFullYear(event.target.value.split('-')[0], event.target.value.split('-')[1], event.target.value.split('-')[2]);
            setUpdatedEvent({ ...updatedEvent, [field] : up.toISOString() });
        }


        else {
            let value = event.target.value;
            setUpdatedEvent({ ...updatedEvent, [field]: value });
        }

       
      }

    return (
        <div id='usersivents'>
            <div className='div-event-part'>
                <div >
                    <label  htmlFor="title">Название:</label>
                    <input id="title" type="text" defaultValue={event.name} onChange={(event) => handleChange(event, 'name')} />
                </div>
                <div>
                    <label htmlFor="project">Проект:</label>
                    <input id="project" type="text" defaultValue={event.projectid} onChange={(event) => handleChange(event, 'projectid')} />
                </div>
            </div>
            <div className='div-event-part'>
                <div className='dateevent'>
                    <label htmlFor="start">Начало:</label>
                    <input 
                    id="start" 
                    type="time" 
                    defaultValue={userTime} 
                    onChange={(event) => handleChange(event, 'startTime')} />
                </div>
                <div className='dateevent'>
                    <label htmlFor="end">Конец:</label>
                    <input 
                    id="end" 
                    type="time" 
                    defaultValue={userTimeEnd} 
                    onChange={(event) => handleChange(event, 'endTime')} />
                </div>
                {/* <div className='dateevent'>
                    <label htmlFor="date">Дата:</label>
                    <input id="date" type="date" value={date} onChange={(event) => handleChange(event, 'startTime')} />
                </div> */}
                    <button  type="submit" onClick={handleSave}>Подтвердить</button>
            </div>
        </div>
    );
};

export default Input;