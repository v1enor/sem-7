import React, { useState } from "react";
import LeftMenu from '../LeftMenu/LeftMenu';
import AllTask from '../TaskContent/AllTask';

import {getiduser} from '../../services/apiUser';

const TaskPage = () => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useState(() => {
        getiduser()
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }
    

    return (
        <div style={{ display: 'flex' }}>
            <LeftMenu />
            <AllTask user={user} />
        </div>
    );
}

export default TaskPage;