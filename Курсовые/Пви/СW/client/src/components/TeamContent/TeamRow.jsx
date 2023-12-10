import React, { useState } from 'react';

import { updateProject, completeProject } from '../../services/apiProjects';
import Alert from '../Alert/Alert';
const TeamRow = ({ team }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTeam, setUpdatedTeam] = useState(team);

    const handleEdit = () => {setIsEditing(true);};

    const handleSave = () => {

        const teamsList = typeof updatedTeam.teamlist === 'string' ? updatedTeam.teamlist.split(', ') : updatedTeam.teamlist;

        const teamToSave = {
            ...updatedTeam,
            teamlist: teamsList
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

        if (field === 'teamlist') {
            value = value.split(', ');
          }
        setUpdatedTeam({ ...updatedTeam, [field]: value });
    };

    // const handleComplete = () => {
    //     completeTeam(updatedTeam._id)
    //         .then(() => {
    //             Alert.fire({
    //                 title: 'Отлично!',
    //                 text: 'Команда успешно завершена!',
    //                 icon: 'success',
    //                 timer: 1000,
    //             })
    //         })
    //         .catch(error => {
    //             Alert.fire({
    //                 title: 'Ошибка!',
    //                 text: error.message || 'Что-то пошло совсем не так!',
    //                 icon: 'error',
    //                 confirmButtonText: 'Попробовать еще раз'
    //             });
    //         });
    //     setIsEditing(false);
    // };

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
            <label>Команды</label>
            <input type="text" size={10} 
                defaultValue={team.teamlist ? team.teamlist.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'teamlist')} 
                readOnly={!isEditing} />
            {!isEditing && <button onClick={handleEdit}>Edit</button>}
            {isEditing && <button onClick={handleSave}>Save</button>}
            {/* {isEditing && <button onClick={handleComplete}>Complete</button>} */}
            {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
        
        </div>
    );
};

export default TeamRow;
   