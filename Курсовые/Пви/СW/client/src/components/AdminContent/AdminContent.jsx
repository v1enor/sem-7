import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/apiUser';
import UserRow from './UserRow';
import AlertForm from '../Alert/AlertForm';
import './AdminContent.css';
import '../../components/Alert/Alert.css'

const AdminContent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = "/admin";
    }


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
        <>
            <div id='admin-header'>
                <h2>Пользователи</h2>
                <AlertForm />
                <button onClick={handleLogout}>Выйти</button>
            </div>
            <div className='users'>
                {users && users.map(user => <UserRow key={user._id} user={user} />)}
            </div>
        </>
    );
};

export default AdminContent;