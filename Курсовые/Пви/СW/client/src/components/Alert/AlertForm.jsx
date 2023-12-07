import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Alert.css';

import { createUser } from '../../services/apiUser.js';
const MySwal = withReactContent(Swal);

export default function CreateUserForm() {
  const [formdata, setformdata] = useState();

  const handleCreateUser = () => {
    const createUserForm = async () => {
      const swalval = await MySwal.fire({
        title: 'Создать пользователя',
        focusConfirm: false,
        html: `
          <input class="swal2-input" id="Логин" type="text" placeholder="Имя" /><br />
          <input class="swal2-input" id="Почта" type="email" placeholder="Почта" /><br />
          <input class="swal2-input" id="Пароль" type="password" placeholder="Пароль" /><br />
          <div class="swal2-checkbox" style="display: flex;">
          <label><input type="checkbox" id="user" value="user"> User</label><br>
          <label><input type="checkbox" id="manager" value="manager"> Manager</label><br>
          <label><input type="checkbox" id="admin" value="admin"> Admin</label><br>
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
          
          // добавьте здесь другие классы, которые вы хотите настроить
      },
      buttonsStyling: false,
        preConfirm: () => {
          const roles = [
            document.getElementById('user').checked ? 'user' : null,
            document.getElementById('manager').checked ? 'manager' : null,
            document.getElementById('admin').checked ? 'admin' : null,
          ].filter(Boolean);
  
          return {
            login: document.getElementById('Логин').value,
            email: document.getElementById('Почта').value,
            password: document.getElementById('Пароль').value,
            roles: roles
          };
        },
      });
  
   
      if (swalval.value) {
        createUser(swalval.value)
          .then(response => {
            Swal.fire({
              title: 'Пользователь создан!',
              text: 'Пользователь успешно создан!',
              icon: 'success',
              confirmButtonText: 'Ок',
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Ошибка!',
              text: 'Ошибка создания пользователя!\n' + error.message,
              icon: 'error',
              confirmButtonText: 'Ок',
            });
          });
      }
    };

    createUserForm();
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}
