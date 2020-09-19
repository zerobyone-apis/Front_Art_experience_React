import React, { useState, useContext } from 'react';

import { Button } from '../button/button';
import { LoginForm } from './login-form/login-form';
import { RegisterForm } from './register-form/register-form';
import { ThemeContext } from '../../contexts/ThemeContext';
import './client-access.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';
export const ClientAccess = (props: {
    onClientLogged: any
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register

    return (
        <div className={`client_info-box effect-slide-top`}>
            {accessMode == 0 ?
                (
                    <div className='form effect-slide_top'>
                        <LoginForm onClientLogged={props.onClientLogged} />
                        <p className={`text text-${getTheme()}`}>Si no estas registrado, ingresa AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(1);
                            }}
                            className="access_btn theme-button-outlined"
                            label="Registrate Aqui"
                        />
                    </div>
                ) :
                (
                    <div className='form'>
                        <RegisterForm onClientRegister={props.onClientLogged} />
                        <p className={`text text-${getTheme()}`}>Si ya estas registrado accede AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(0);
                            }}
                            className="access_btn theme-button-outlined"
                            label="Accede Aqui"
                        />
                    </div>
                )
            }
        </div >
    );
}
