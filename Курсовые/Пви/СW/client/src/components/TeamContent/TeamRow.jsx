import React, { useState } from 'react';
import { updateTeam } from '../../services/apiTeams';
import { setstatus } from '../../services/apiTeams';
import Alert from '../Alert/Alert';
const TeamRow = ({ team }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTeam, setUpdatedTeam] = useState(team);

    const handleEdit = () => {setIsEditing(true);};

    const handleSave = () => {

        const userlist = typeof updatedTeam.userlist === 'string' ? updatedTeam.userlist.split(', ') : updatedTeam.userlist;
        const manager = typeof updatedTeam.manager === 'string' ? updatedTeam.manager.split(', ') : updatedTeam.manager;

        const teamToSave = {
            ...updatedTeam,
            userlist,
            manager,
        };

        setIsEditing(false);
        updateTeam(teamToSave)
            .then(  () => {
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Команда успешно изменена!',
                    icon: 'success',
                    timer: 1000,
                })
            })
            .catch(error => {
                Alert.fire({
                    title: 'Ошибка!',
                    text: error.message || 'Что-то пошло совсем не так!',
                    icon: 'error',
                    confirmButtonText: 'Попробовать еще раз'
                });
            });
    };

    const handleChange = (event, field) => {
        let value = event.target.value;

        if (field === 'userlist' || field === 'manager') {
            value = value.split(', ');
          }
        setUpdatedTeam({ ...updatedTeam, [field]: value });
    };

    const handleComplete = () => {
        setstatus(updatedTeam)
            .then(() => {
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Команда успешно завершена!',
                    icon: 'success',
                    timer: 1000,
                })
            })
            .catch(error => {
                Alert.fire({
                    title: 'Ошибка!',
                    text: error.message || 'Что-то пошло совсем не так!',
                    icon: 'error',
                    confirmButtonText: 'Попробовать еще раз'
                });
            });
        setIsEditing(false);
    };

    return (
        <div key={team._id}>
            <label>Id:</label>
            <input type="text" defaultValue={team._id} readOnly size={3} />
            <label>Название:</label>
            <input type="text" size={10} defaultValue={team.title} onChange={(event) => handleChange(event, 'title')} readOnly={!isEditing} />
            <label>Описание:</label>
            <input type="text"  size={10} defaultValue={team.description} onChange={(event) => handleChange(event, 'description')} readOnly={!isEditing} />
            <label>Статус:</label>
            <input type="text" size={10} defaultValue={team.status} onChange={(event) => handleChange(event, 'status')} readOnly={!isEditing} />
            <label>Пользователи</label>
            <input type="text" size={10} 
                defaultValue={team.userlist ? team.userlist.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'userlist')} 
                readOnly={!isEditing} />

            <label>Менеджеры</label>
            <input type="text" size={10} 
                defaultValue={team.manager ? team.manager.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'manager')} 
                readOnly={!isEditing} />
            {!isEditing && <button onClick={handleEdit}>Edit</button>}
            {isEditing && <button onClick={handleSave}>Save</button>}
            {isEditing && <button onClick={handleComplete}>Complete</button>}
            {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
        
        </div>
    );
};

export default TeamRow;
   