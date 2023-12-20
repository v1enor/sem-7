import React, { useState } from 'react';
import { updateTeam } from '../../services/apiTeams';
import { setstatus } from '../../services/apiTeams';
import Alert from '../Alert/Alert';
const TeamRow = ({ team, readOnly }) => {
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
        <div class="projectrow" key={team._id}>
            <div>

            <label>Id:</label>
            <input type="text" defaultValue={team._id} readOnly size={3} />
            </div>
            <div>

            <label>Название:</label>
            <input type="text"defaultValue={team.title} size={14} onChange={(event) => handleChange(event, 'title')} readOnly={!isEditing} />
            </div>


            <div>

            <label>Описание:</label>
            <input type="text" defaultValue={team.description} onChange={(event) => handleChange(event, 'description')} readOnly={!isEditing} />
            </div>

            <div>

            <label>Статус:</label>
            <input type="text" size={8} defaultValue={team.status} onChange={(event) => handleChange(event, 'status')} readOnly={!isEditing} />
            </div>
            <div>

            <label>Пользователи</label>
            <input type="text"
                defaultValue={team.userlist ? team.userlist.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'userlist')} 
                readOnly={!isEditing} />

            </div>
            
            <div>

            <label>Менеджеры</label>
            <input type="text" size={10} 
                defaultValue={team.manager ? team.manager.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'manager')} 
                readOnly={!isEditing} />
            </div>
            <div class="savebtn">

            {!isEditing && !readOnly && <button onClick={handleEdit}>Изменить</button>}
            {isEditing && <button onClick={handleSave}>Сохранить</button>}
            {isEditing && <button onClick={handleComplete}>Готов!</button>}
            {isEditing && <button onClick={() => setIsEditing(false)}>Отмена</button>}
            </div>
        
        </div>
    );
};

export default TeamRow;
   