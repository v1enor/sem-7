import React from 'react';
import Input from "../Form/Form";
import './EventsByDay.css';
const EventsByDay = ({ events, setEvents }) => {
    const eventsByStatusAndDate = events.reduce((groups, event) => {
        const date = event.startTime.split('T')[0];
        const status = event.status;
        if (!groups[status]) {
            groups[status] = {};
        }
        if (!groups[status][date]) {
            groups[status][date] = [];
        }
        groups[status][date].push(event);
        return groups;
    }, {});

    const statuses = Object.keys(eventsByStatusAndDate).sort((a, b) => {
        if (a === 'active') return -1;
        if (b === 'active') return 1;
        return 0;
    });

    return (
        <div className='sheldue'>
            {statuses.length === 0 && <h2>У вас пока нет задач!</h2>}
            {statuses.map((status) => {
                const dates = Object.keys(eventsByStatusAndDate[status]);
                return (
                    <div className={status} key={status}>
                        <h2>{status === "archive" ? "Архивировано" : "Активные"}</h2>
                        {dates.map((date, index) => {
                            const formattedDate = new Date(date);
                            const dayName = formattedDate.toLocaleDateString('ru-RU', { weekday: 'long' });
                            return (
                                <div className="dayivents" key={index}>
                                    <h2>День: {date} - {dayName}</h2>
                                    {eventsByStatusAndDate[status][date].map((event, index) => (
                                        <Input key={index} event={event} status={status} setEvents={setEvents} />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
export default EventsByDay;