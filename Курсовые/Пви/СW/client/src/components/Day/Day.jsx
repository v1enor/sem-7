import './Day.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Day = () => {
    const hours = Array.from({length: 24}, (_, i) => i);
    const quarters = Array.from({length: 4}, (_, i) => i);
    const [events, setEvents] = useState([
        {id: 'event1', start: 2.5, end: 3.75, description: 'Event 1'},
        // other events...
    ]);

    const onDragEnd = (result) => {
        // TODO: update event position based on drag result
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="day">
                {hours.map((hour, index) => (
                    <div key={index} className="hour">
                        {quarters.map((quarter, indexq) => (
                            <Droppable droppableId={`droppable-${index}-${indexq}`}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="quarter">
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                ))}
                {events.map((event, eventIndex) => {
                    return (
                        <Draggable key={event.id} draggableId={event.id} index={eventIndex}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="event" style={{position: 'absolute', top: `${event.start * 100}%`, height: `${(event.end - event.start) * 100}%`}}>
                                    {event.description}
                                </div>
                            )}
                        </Draggable>
                    );
                })}
            </div>
        </DragDropContext>
    );
};

export default Day;
