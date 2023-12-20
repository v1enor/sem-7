import React from 'react';
import TopMenu from '../TopMenu/TopMenu';
import EventsByDay from '../EventsByDay/EventsByDay';
import './MainContainer.css';
import { getEvents } from '../../services/apiEvents'
import AddTask from '../AddTask/AddTask';

const MainContainer = () => {

    const [loading, setLoading] = React.useState(false);
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        getEvents()
            .then((data) => {

                setLoading(true);
                setEvents(data);
            })
            .catch((error) => {
                setLoading(true);
                console.log(error);
            });
    }, []);


    if (!loading) {
        return (

            <h1>Loading...</h1>

        );
    }

    return (
        <div className='mainContainer'>
            <AddTask setEvents={setEvents} />
            <EventsByDay events={events} />

        </div>

    );
};

export default MainContainer;
