import React, { useState } from 'react';

import { Button } from '../Button';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './ClientAccess.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';

export const ClientAccess = (props: {
    onClientLogged: any
}) => {

    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register

    return (
        <div className="client_info-box">
            {accessMode == 0 ?
                (
                    <div className='form'>
                        <LoginForm onClientLogged={props.onClientLogged} />
                        <p className="art_experience-text-light title">Si no estas registrado, ingresa AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(1);
                            }}
                            className="access_btn art_experience-button_outlined"
                            label="Registrate Aqui"
                        />
                    </div>
                ) :
                (
                    <div className='form'>
                        <RegisterForm onClientRegister={props.onClientLogged} />
                        <p className="art_experience-text-light title">Si ya estas registrado accede AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(0);
                            }}
                            className="access_btn art_experience-button_outlined"
                            label="Accede Aqui"
                        />
                    </div>
                )
            }
        </div >
    );
}
