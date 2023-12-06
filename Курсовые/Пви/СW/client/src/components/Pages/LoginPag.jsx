import React, { useState } from 'react';
import "./styles/RegisterPage.css";
import { authenticateUser } from "../../services/apiUser";
import Alert from '../../components/Alert/Alert';

const RegisterPage = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const user = {
            "login": login,
            "password": password,
        };

        authenticateUser(user)
            .then(user => {
                // Handle the response
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Вы успешно вошли!',
                    icon: 'success',
                    timer: 1000,
                }).then((result) => {
                   
                        window.location.href = "/"; // переход на страницу входа после нажатия кнопки "Войти"
                    
                });
            })
            .catch(error => {
                Alert.fire({
                    title: 'Ошибка!',
                    text: 'Логин или пароль не тот!',
                    icon: 'error',
                    confirmButtonText: 'Попробовать еще раз'
                });
                console.error('Error:', error.message);
            });
    };
    return (
        <div id='login-container'>
            <h1>Вход</h1>
            <label>
                Логин:
                <input id='login-input'
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>
                Пароль:
                <input id='password-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button onClick={handleLogin}>Вход</button>
            <a href="/signin">Нет аккаунта?</a>
        </div>
    );
};

export default RegisterPage;
