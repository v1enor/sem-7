import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Alert.css';
import Alert from './Alert.js';

import { createProject } from '../../services/apiProjects.js';
import { createTask } from '../../services/apiTask.js';
const MySwal = withReactContent(Swal);

export default function CreateAlertForm({ projects }) {

  const handleCreateAlert = () => {


    const CreateAlertForm = async () => {

      let options = projects.map((project, index) =>
        `<option key=${index} value=${project._id}>${project.title}</option>`
      ).join('');

      // Используйте useState для хранения списка команд
      const swalval = await MySwal.fire({
        title: 'Создать задачу',
        focusConfirm: false,
        html: `
          <div class="inputs">
          <input class="alert-input" id="Заголовок" type="text" placeholder="Заголовок" />
          <input class="alert-input" id="Описание" type="text" placeholder="Описание" />
          <select class="alert-input" id="Проект">
          ${options}
          </select>
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
            projectId: document.getElementById('Проект').value,
          };
        },
      });


      if (swalval.value) {
        createTask(swalval.value).then(response => {
            Alert.fire({
              title: 'Задача создана!',
              text: 'Задача успешно создана!',
              icon: 'success',
              confirmButtonText: 'Ок',
            });
          }).catch(error => {
            Alert.fire({
              title: 'Ошибка!',
              text: 'Ошибка создания задачи!\n' + error.message,
              icon: 'error',
              confirmButtonText: 'Ок',
            });
          });

      }

    };
    CreateAlertForm();
  };

  return (
    <div>
      <button onClick={handleCreateAlert}>Добавить задачу</button>

    </div>
  );
}
