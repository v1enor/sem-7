import React from 'react';
import TopMenu from '../TopMenu/TopMenu';
import EventsByDay from '../EventsByDay/EventsByDay';
import './MainContainer.css';
const MainContainer = () => {
    const events = [
        { title: 'Event 1', project: 'Project 1', command: 'Command 1', start: '10:00', end: '12:00', date: '03-07-2012' },
        { title: 'Event 2', project: 'Project 2', command: 'Command 2', start: '14:00', end: '16:00', date: '2021-01-02' },
        { title: 'Event 2', project: 'Project 2', command: 'Command 2', start: '14:00', end: '16:00', date: '2021-01-02' },
        { title: 'Event 2', project: 'Project 2', command: 'Command 2', start: '14:00', end: '16:00', date: '2021-01-02' },
        // Add more events as needed
    ];
    return (
        <div className='mainContainer'>
            <TopMenu />
            <EventsByDay events={events} />

        </div>
        
    );
};

export default MainContainer;
