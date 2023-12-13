import React from 'react';
import Input from "../Form/Form";
import './EventsByDay.css';
const EventsByDay = ({ events }) => {
    const eventsByDate = events.reduce((groups, event) => {
        const date = event.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(event);
        return groups;
    }, {});
    const dates = Object.keys(eventsByDate);
    return (
        <div className='sheldue'>
            {dates.map((date, index) => {
                const formattedDate = new Date(date);
                const dayName = formattedDate.toLocaleDateString('ru-RU', { weekday: 'long' });
                return (
                    <div class="dayivents" key={index}>
                        <h2>День: {date} - {dayName}</h2>
                        {eventsByDate[date].map((event, index) => (
                            <Input key={index} event={event} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
export default EventsByDay;