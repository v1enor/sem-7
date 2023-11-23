// Event.jsx
import React from 'react';
import './Event.css';

const Event = ({ event }) => {
    const style = {
        gridRow: `${event.start + 1} / span ${event.end - event.start}`,
        gridColumn: event.day + 2,
    };

    return (
        <div className="event" style={style}>
            {event.description}
        </div>
    );
};

export default Event;