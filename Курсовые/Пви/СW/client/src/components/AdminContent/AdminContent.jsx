import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/apiUser';
import UserRow from './UserRow'; // Предполагается, что UserRow находится в той же папке

const AdminContent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Загрузите данные пользователей при первом рендере
        getUsers()
            .then(data => {
                setUsers(data);
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
        <div>
            {users && users.map(user => <UserRow key={user._id} user={user} />)}
        </div>
    );
};

export default AdminContent;