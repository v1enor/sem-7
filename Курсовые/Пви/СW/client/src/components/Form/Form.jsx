import React, { useState } from 'react';
import './Form.css';
import { updateEvent, archiveEvent, activeEvent, getEvents } from '../../services/apiEvents';

import Alert from '../../components/Alert/Alert';

const Input = ({ event, status, setEvents }) => {

    const [updatedEvent, setUpdatedEvent] = useState(event);


    const utcDate = new Date(event.startTime); // event.startTime должно быть в формате UTC
    const userTime = utcDate.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    
    const utcDateEnd = new Date(event.endTime); // event.startTime должно быть в формате UTC
    const userTimeEnd = utcDateEnd.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });



    const handleSave = () => {
        let selectedEndTime = new Date(updatedEvent.endTime);
        let selectedStartTime = new Date(updatedEvent.startTime);

        // Проверка, чтобы конечное время не было раньше начального
        if (selectedEndTime < selectedStartTime) {
            Alert.fire({
                title: 'Ошибка!',
                text: 'Конечное время не может быть раньше начального!',
                icon: 'error',
                confirmButtonText: 'Ок',
                timer: 5000,
            });
            setUpdatedEvent.eventEndTime = selectedStartTime;
        } else {



        updateEvent(updatedEvent)
        .then((data) => {
            Alert.fire({
                title: 'Успешно!',
                text: 'Задача успешно обновлена!',
                icon: 'success',
                confirmButtonText: 'Ок',
            })
        })
                .catch((error) => {
                    Alert.fire({
                        title: 'Ошибка!',
                        text: 'Что-то пошло не так!',
                        icon: 'error',
                        confirmButtonText: 'Ок',
                    });
                });
        }
    };


    const handleArchive = () => {
        archiveEvent(updatedEvent)
            .then((data) => {

                Alert.fire({
                    title: 'Успешно!',
                    text: 'Событие успешно архивирована!',
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
                    text: 'Что-то пошло не так!' + error,
                    icon: 'error',
                    confirmButtonText: 'Ок',
                });
            });
    }   

    const handleUnArchive = () => {
        activeEvent(updatedEvent).
            then((data) => {
                Alert.fire({
                    title: 'Успешно!',
                    text: 'Событие успешно восстановлено!',
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
                            text: 'Что-то пошло не так!' + error,
                            icon: 'error',
                            confirmButtonText: 'Ок',
                        });
                    });
    }


    const handleChange = (event, field) => {

        if (field === 'startTime') {



            let up = new Date(updatedEvent.startTime);
            up.setHours(event.target.value.split(':')[0], event.target.value.split(':')[1]);
            setUpdatedEvent({ ...updatedEvent, [field]: up.toISOString() });

        } else if (field === 'endTime') {


            let up = new Date(updatedEvent.endTime);
            up.setHours(event.target.value.split(':')[0], event.target.value.split(':')[1]);
            setUpdatedEvent({ ...updatedEvent, [field] : up.toISOString() });
        }else if (field === 'date') {
            let up = new Date(updatedEvent.startTime);
            up.setFullYear(event.target.value.split('-')[0], event.target.value.split('-')[1], event.target.value.split('-')[2]);
            setUpdatedEvent({ ...updatedEvent, [field] : up.toISOString() });
        } else {
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
                        max="23:59" 
                    defaultValue={userTime} 
                    onChange={(event) => handleChange(event, 'startTime')} />
                </div>
                <div className='dateevent'>
                    <label htmlFor="end">Конец:</label>
                    <input 
                    id="end" 
                    type="time" 
                    defaultValue={userTimeEnd} 
                        min={userTime}
                    onChange={(event) => handleChange(event, 'endTime')} />
                </div>
<<<<<<< HEAD
=======

>>>>>>> 09661f69918a2b1eba2e836358c1659eef01b175
                {/* <div className='dateevent'>
                    <label htmlFor="date">Дата:</label>
                    <input id="date" type="date" value={date} onChange={(event) => handleChange(event, 'startTime')} />
                </div> */}

                {status === 'active' && (
                    <button type="submit" onClick={handleArchive}>Архивировать</button>
                )}
                {status === 'archive' && (
                    <button type="submit" onClick={handleUnArchive}>Актуальное</button>
                )}
                <button type="submit" onClick={handleSave}>Подтвердить</button>
            </div>
        </div>
    );
};

export default Input;