import React, { useEffect,useState } from 'react';
import {getUsers, updateUser} from '../../services/apiUser';
import './AdminContent.css';
import Alert from '../Alert/Alert';
import AlertForm from '../Alert/AlertForm';

const AdminContent = () => {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);


    const handleEdit = () => {
        setIsEditing(prev => !prev);
    };

    useEffect(() => {
        const fetchUsers = async () => {
        const data = await getUsers();
          setUsers(data);
        };
      
        fetchUsers();
      }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = "/admin";
    }

    const handleSave = () => {
        setIsEditing(false);
        updateUser(updatedUser).then(() => {
            Alert.show('Данные успешно обновлены');
            
        // Здесь вы можете отправить обновленные данные на сервер
        // Например, вы можете использовать fetch или axios для отправки POST или PUT запроса
    })};
      
    const handleChange = (event, field) => {
        setUpdatedUser({ ...updatedUser, [field]: event.target.value });
    };

    


    
    return (
        <div>
            <div id='admin-header' >

            <h2>Пользователи</h2>
            <AlertForm ></AlertForm>
            <button onClick={handleLogout}>Выйти</button>
            <button onClick={handleEdit}>Edit</button>
            {isEditing && <button onClick={handleSave}>Save</button>}
            </div>
            {users.map((user, index) => (
            <div key={user._id}>
                <label >Id:</label>
                <input type="text" defaultValue={user._id}  style={{ width: '100px' }} readOnly />
                <label >Login:</label>
                <input type="text" defaultValue={user.login} readOnly={!isEditing} />
                <label >status:</label>
                <input type="text" defaultValue={user.status} readOnly={!isEditing}  style={{ width: '70px' }} />
                <label >Email:</label>
                <input type="text" readOnly={!isEditing}  defaultValue={user.email} />
                <label>Roles:</label>
                <input type="text" readOnly={!isEditing}  defaultValue={user.roles ? user.roles.join(', ') : ''}  />
                <label>Companies:</label>
                <input type="text" readOnly={!isEditing}  defaultValue={user.companies ? user.companies.join(', ') : ''}  />
                
            </div>
            ))}
        </div>
    );
};

export default AdminContent;
