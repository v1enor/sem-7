import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import Alert from './Alert.js';
import { getTeams } from '../../services/apiTeams.js'; // Импортируйте вашу функцию для получения проектов
import { createTeam } from '../../services/apiTeams.js';
const MySwal = withReactContent(Swal);

export default function CreateTeamForm  ({ updateProjects }) {

  const handleCreateTeam = () => {
    const CreateTeamForm = async () => {
      const swalval = await MySwal.fire({
        title: 'Создать команду',
        focusConfirm: false,
        html: `
          <div class="inputs">
          <input class="alert-input" id="Название" type="text" placeholder="Название" />
          <input class="alert-input" id="Заголовок" type="text" placeholder="Заголовок" />
          <input class="alert-input" id="Описание" type="text" placeholder="Описание" />
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
            name: document.getElementById('Название').value,
            title: document.getElementById('Заголовок').value,
            description: document.getElementById('Описание').value,
          };
        },
      });
  
   
      if (swalval.value) {
        createTeam(swalval.value)
          .then(response => {
            getTeams().then(data => {
              updateProjects(data);
            });
            Alert.fire({
              title: 'Команда создана!',
              text: 'Команда успешно создана!',
              icon: 'success',
              confirmButtonText: 'Ок',
            });
          })
          .catch(error => {
            Alert.fire({
              title: 'Ошибка!',
              text: 'Ошибка создания команды!\n' + error.message,
              icon: 'error',
              confirmButtonText: 'Ок',
            });
          });
      }
    };
    CreateTeamForm();
  };

  return (
    <div>
      <button onClick={handleCreateTeam}>Создать</button>
    </div>
  );
}
