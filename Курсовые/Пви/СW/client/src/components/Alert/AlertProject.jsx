import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import Alert from './Alert.js';
import { getProjects } from '../../services/apiProjects'; // Импортируйте вашу функцию для получения проектов
import { createProject } from '../../services/apiProjects.js';
const MySwal = withReactContent(Swal);

export default function CreateProjectForm  ({ updateProjects }) {

  const handleCreateProject = () => {
    const CreateProjectForm = async () => {
      const swalval = await MySwal.fire({
        title: 'Создать проект',
        focusConfirm: false,
        html: `
          <div class="inputs">
          <input class="alert-input" id="Заголовок" type="text" placeholder="Заголовок" />
          <input class="alert-input" id="Описание" type="text" placeholder="Описание" />
          <input class="alert-input" id="Список" type="text" placeholder="Список команд" />
          </div>
        `,
        confirmButtonText: 'Создать',
        customClass: {
          confirmButton: 'alert-button',
          title: 'alert-title',
          popup: 'alert-popup',
          content: 'alert-content',
          icon: 'alert-icon',
          input: 'alert-input',
          inputLabel: 'alert-input-label',

      },
      buttonsStyling: false,
        preConfirm: () => {
          return {
            title: document.getElementById('Заголовок').value,
            description: document.getElementById('Описание').value,
          
          };
        },
      });
  
   
      if (swalval.value) {
        createProject(swalval.value)
          .then(response => {
            getProjects().then(data => {
              updateProjects(data);
            });
            Alert.fire({
              title: 'Проект создан!',
              text: 'Проект успешно создан!',
              icon: 'success',
              confirmButtonText: 'Ок',
            });
          })
          .catch(error => {
            Alert.fire({
              title: 'Ошибка!',
              text: 'Ошибка создания проекта!\n' + error.message,
              icon: 'error',
              confirmButtonText: 'Ок',
            });
          });
      }
    };
    CreateProjectForm();
  };

  return (
    <div>
      <button onClick={handleCreateProject}>Создать</button>
    </div>
  );
}
