import React, { useState } from 'react';
import axios from 'axios';
import { updateUser } from '../../services/apiUser';
const UserRow = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        updateUser(updatedUser)

    };

    const handleChange = (event, field) => {
        setUpdatedUser({ ...updatedUser, [field]: event.target.value });
    };

    return (
        <div key={user._id}>
            <label>Id:</label>
            <input type="text" defaultValue={user._id} readOnly />
            <label>Login:</label>
            <input type="text" defaultValue={user.login} onChange={(event) => handleChange(event, 'login')} readOnly={!isEditing} />
            <label>Status:</label>
            <input type="text" defaultValue={user.status} onChange={(event) => handleChange(event, 'status')} readOnly={!isEditing} />
            <label>Email:</label>
            <input type="text" defaultValue={user.email} onChange={(event) => handleChange(event, 'email')} readOnly={!isEditing} />
            <label>Roles:</label>
            <input type="text" defaultValue={user.roles ? user.roles.join(', ') : ''} readOnly />
            <label>Companies:</label>
            <input type="text" defaultValue={user.companies ? user.companies.join(', ') : ''} readOnly />
            <button onClick={handleEdit}>Edit</button>
            {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
    );
};

export default UserRow;