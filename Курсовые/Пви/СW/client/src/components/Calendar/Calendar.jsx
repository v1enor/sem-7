import React from 'react';
import './Calendar.cs'
const Calendar = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const events = [
        { start: 13.5, end: 16, description: 'Event 1', day: 1 },
        // Add more events as needed
    ];

    return (
        <div className="calendar">
            <h1>Calendar</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {days.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, index) => (
                        <tr key={index}>
                            <td>{hour}:00</td>
                            {days.map((day, dayIndex) => (
                                <td key={dayIndex}>
                                    {events.map((event, eventIndex) => {
                                        if (event.day === dayIndex && event.start <= hour && event.end > hour) {
                                            return <div key={eventIndex}>{event.description}</div>
                                        }
                                    })}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;