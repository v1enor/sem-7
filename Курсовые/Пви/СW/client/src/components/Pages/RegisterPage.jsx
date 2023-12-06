import React, { useState } from 'react';
import "./styles/RegisterPage.css";
import { RegisterUser } from "../../services/apiUser";
import Alert from '../../components/Alert/Alert';

const RegisterPage = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = () => {
        const user = {
            "login": login,
            "email": email,
            "password": password
        };

        RegisterUser(user)
            .then(user => {
                // Handle the response
                Alert.fire({
                    title: 'Отлично!',
                    text: 'Регистрация прошла успешно',
                    icon: 'success',
                    confirmButtonText: 'Войти'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/signin"; // переход на страницу входа после нажатия кнопки "Войти"
                    }
                });
            })
            .catch(error => {
                Alert.fire({
                    title: 'Ошибка!',
                    text: 'Логин или email уже занят',
                    icon: 'error',
                    confirmButtonText: 'Попробовать еще раз'
                });
                console.error('Error:', error.message);
            });
    };
    return (
        <div id='login-container'>
            <h1>Регистрация</h1>
            <label>
                Логин:
                <input id='login-input'
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input id='email-input'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            <button onClick={handleLogin}>Регистрация</button>
            <a href="/signin">Есть аккаунт?</a>
        </div>
    );
};

export default RegisterPage;
