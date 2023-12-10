import React, { useState } from 'react';
import { updateProject, completeProject } from '../../services/apiProjects';
import Alert from '../../components/Alert/Alert';
const ProjectRow = ({ project }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProject, setUpdatedProject] = useState(project);

    const handleEdit = () => {setIsEditing(true);};

    const handleSave = () => {

        const teamsList = typeof updatedProject.teamlist === 'string' ? updatedProject.teamlist.split(', ') : updatedProject.teamlist;

        const projectToSave = {
            ...updatedProject,
            teamlist: teamsList
        };

        setIsEditing(false);
        updateProject(projectToSave)
            .then(  () => {
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Проект успешно изменен!',
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
        setUpdatedProject({ ...updatedProject, [field]: value });
    };

    const handleComplete = () => {
        completeProject(updatedProject._id)
            .then(() => {
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Проект успешно завершен!',
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
        <div key={project._id}>
            <label>Id:</label>
            <input type="text" defaultValue={project._id} readOnly size={3} />
            <label>Название:</label>
            <input type="text" size={10} defaultValue={project.title} onChange={(event) => handleChange(event, 'title')} readOnly={!isEditing} />
            <label>Описание:</label>
            <input type="text"  size={10} defaultValue={project.description} onChange={(event) => handleChange(event, 'description')} readOnly={!isEditing} />
            <label>Статус:</label>
            <input type="text" size={10} defaultValue={project.status} onChange={(event) => handleChange(event, 'status')} readOnly={!isEditing} />
            <label>Команды</label>
            <input type="text" size={10} 
                defaultValue={project.teamlist ? project.teamlist.join(', ') : ''} 
                onChange={(event) => handleChange(event, 'teamlist')} 
                readOnly={!isEditing} />
            {!isEditing && <button onClick={handleEdit}>Edit</button>}
            {isEditing && <button onClick={handleSave}>Save</button>}
            {isEditing && <button onClick={handleComplete}>Complete</button>}
            {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
        
        </div>
    );
};

export default ProjectRow;