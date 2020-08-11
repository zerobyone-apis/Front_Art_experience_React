import React, { useState } from 'react';

import { Button } from '../Button';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './ClientAccess.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';
import '../../styles/Effects.scss';

export const ClientAccess = (props: {
    onClientLogged: any
}) => {

    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register

    return (
        <div className="client_info-box effect-slide_top">
            {accessMode == 0 ?
                (
                    <div className='form effect-slide_top'>
                        <LoginForm onClientLogged={props.onClientLogged} />
                        <p className="art_experience-text-light art-text title">Si no estas registrado, ingresa AQUI</p>
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
                        <p className="art_experience-text-light art-text title">Si ya estas registrado accede AQUI</p>
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
