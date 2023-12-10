import React, { useState } from 'react';
import { updateUser } from '../../services/apiUser';
import Alert from '../Alert/Alert';
import { kMaxLength } from 'buffer';
const UserRow = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleEdit = () => {setIsEditing(true);};

    const handleSave = () => {
        setIsEditing(false);
        const rolesList = typeof updatedUser.roles === 'string' ? updatedUser.roles.split(',') : updatedUser.roles;
        const companiesList = typeof updatedUser.companies === 'string' ? updatedUser.companies.split(',') : updatedUser.companies;
      
        const userToSave = {
          ...updatedUser,
          roles: rolesList,
          companies: companiesList
        };
        updateUser(userToSave)
            .then(data => {
                console.log(data);
                
            })
            .catch(error => {
                console.error(error);
                
            });
    };

    const handleChange = (event, field) => {
        let value = event.target.value;
      
        // Если поле является 'roles' или 'companies', преобразуйте строку обратно в список
        if (field === 'roles' || field === 'companies') {
          value = value.split(', ');
        }
      
        setUpdatedUser({ ...updatedUser, [field]: value });
      };

    return (
        <div key={user._id}>
            <label>Id:</label>
            <input type="text" defaultValue={user._id} readOnly size={3} />
            <label>Login:</label>
            <input type="text" size={10} defaultValue={user.login} onChange={(event) => handleChange(event, 'login')} readOnly={!isEditing} />
            <label>Status:</label>
            <input type="text" size={3}  defaultValue={user.status} onChange={(event) => handleChange(event, 'status')} readOnly={!isEditing} />
            <label>Email:</label>
            <input type="text" size={10} defaultValue={user.email} onChange={(event) => handleChange(event, 'email')} readOnly={!isEditing} />
            <label>Roles:</label>
            <input 
            type="text" 
            defaultValue={user.roles ? user.roles.join(', ') : ''} 
            onChange={(event) => handleChange(event, 'roles')} 
            readOnly={!isEditing} 
            />
            <label>Companies:</label>
            <input 
            type="text" 
            defaultValue={user.companies ? user.companies.join(', ') : ''} 
            onChange={(event) => handleChange(event, 'companies')} 
            readOnly={!isEditing} 
            />
            <button onClick={handleEdit}>Edit</button>
            {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
    );
};

export default UserRow;