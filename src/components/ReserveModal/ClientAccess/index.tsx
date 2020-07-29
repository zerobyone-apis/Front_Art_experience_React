import React, { useState, useContext, Fragment } from 'react';

import { TextField } from '../../TextField';
import { ValidationForm } from '../../ValidationForm';
import { Button } from '../../Button';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import { IClient } from '../../../types/Client.type';
import ClientActions from '../../../actions/Client.actions';
// import Actions from '../../../actions/User.actions';
import './ClientAccess.scss';
import '../../../styles/ArtExperienceButtons.scss';
import '../../../styles/ArtExperienceFonts.scss';

export const ClientAccess = (props: {
    onClientLogged: any
}) => {
    const defaultLoginFields = {
        email: '',
        password: '',
    };
    const defaultRegisterFields = {
        name: '',
        email: '',
        password: '',
        password2: '',
        cel: '',
    };
    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loginFields, setLoginFields] = useState(defaultLoginFields);
    const [registerFields, setRegisterFields] = useState(defaultRegisterFields);
    // const [errorsFields, setErrorFields] = useState([]); // used by validation
    const clientActions: ClientActions = new ClientActions();

    // Contexts
    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);
    const {
        // @ts-ignore
        setUserData
    } = useContext(UserContext);
    const onChangeLoginField = (value: string, fieldName: string) => {
        console.log(value, ' - ', fieldName)
        setLoginFields({ ...loginFields, [fieldName]: value })
    }
    const onChangeRegisterField = (value: string, fieldName: string) => {
        console.log(value, ' - ', fieldName)
        setRegisterFields({ ...registerFields, [fieldName]: value })
    }
    const changeAccess = (index: number) => {
        hideMessages();
        setAccessMode(index);
    }
    const hideMessages = () => {
        setErrorMessage("");
        setSuccessMessage("")
    }

    // REGISTER
    const register = async () => {
        hideMessages();
        const fields: IClient = {
            username: registerFields.name,
            cel: registerFields.cel,
            email: registerFields.email,
            name: registerFields.name,
            password: registerFields.password,
            password2: registerFields.password2
        }
        setDisabledButton(true);
        const clientResponse = await clientActions.add(fields);
        setDisabledButton(false);
        if (typeof (clientResponse) !== 'string') {
            clientCookie(clientResponse);
            props.onClientLogged(clientResponse);
            setUserData(clientResponse);
            setSuccessMessage('Te has registrado con exitosamente')
        } else {
            setErrorMessage(clientResponse);
        }
        // }
    }

    // LOGIN
    const login = async () => {
        hideMessages();
        const fields = {
            email: loginFields.email,
            password: loginFields.password
        }
        setDisabledButton(true);
        const response = await clientActions.login(fields);
        if (response) {
            props.onClientLogged(response);
            setUserData(response);
            setSuccessMessage('Has iniciado sesion con exito');
        } else {
            setErrorMessage('No se pudo iniciar sesion, verifique email y contaseña');
        }
        setDisabledButton(false);
    }

    //Do feature to save the client object to cookie 
    function clientCookie(client: IClient) {
        document.cookie
    }

    return (
        <div className="client_info-box">
            {accessMode == 0 ? (
                <div className="login-box">
                    <ValidationForm
                        objectTest={loginFields}
                        buttonLabel="Acceder"
                        buttonClassName="access_btn art_experience-button_outlined"
                        onClick={() => {
                            login()
                        }}
                    >
                        <TextField
                            value={loginFields.email}
                            name="email"
                            type="email"
                            required={true}
                            label="Email"
                            onChange={onChangeLoginField} />
                        <TextField
                            value={loginFields.password}
                            name="password"
                            type="password"
                            required={true}
                            label="Contraseña"
                            onChange={onChangeLoginField} />
                    </ValidationForm>
                    <p className="error_message">{errorMessage}</p>
                    <p className="success_message">{successMessage}</p>

                    <p className="art_experience-text-light title">Si no estas registrado, ingresa AQUI</p>
                    <Button
                        onClick={() => {
                            changeAccess(1);
                        }}
                        className="access_btn art_experience-button_outlined"
                        label="Registrate Aqui"
                    />
                </div>
            ) : (
                    <div className="register-box">
                        <ValidationForm
                            objectTest={registerFields}
                            buttonLabel="Registrarse"
                            buttonClassName="access_btn art_experience-button_outlined"
                            onClick={() => {
                                register()
                            }}
                        >
                            <TextField
                                value={registerFields.name}
                                name="name"
                                required={true}
                                label="Nombre"
                                onChange={onChangeRegisterField} />
                            <TextField
                                value={registerFields.email}
                                name="email"
                                type="email"
                                required={true}
                                label="Email"
                                onChange={onChangeRegisterField} />
                            <TextField
                                value={registerFields.cel}
                                name="cel"
                                type="number"
                                required={true}
                                label="Celular / Telefono"
                                onChange={onChangeRegisterField} />
                            <TextField
                                value={registerFields.password}
                                name="password"
                                type="password"
                                required={true}
                                label="Contraseña"
                                onChange={onChangeRegisterField} />
                            <TextField
                                value={registerFields.password2}
                                name="password2"
                                type="password"
                                required={true}
                                label="Repita Contraseña"
                                onChange={onChangeRegisterField} />
                        </ ValidationForm>
                        <p className="error_message">{errorMessage}</p>
                        <p className="success_message">{successMessage}</p>
                        <p className="art_experience-text-light title">Si ya estas registrado accede AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(0);
                            }}
                            className="access_btn art_experience-button_outlined"
                            label="Accede Aqui"
                        />
                    </div>
                )}
        </div>
    );
}
