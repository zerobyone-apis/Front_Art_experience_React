import React, { useState } from 'react';

import { TextField } from '../../TextField';
import { Button } from '../../Button';
// actions
import ClientActions from '../../../actions/Client.actions';
import { IClient } from '../../../types/Client.type';
// styles
import './ClientAccess.scss';
import '../../../styles/ArtExperienceButtons.scss';
import '../../../styles/ArtExperienceFonts.scss';
import Validation from '../../../utils/Validation';

export const ClientAccess = (props: {
    onClientLogged: any
}) => {
    let validate: Validation = new Validation();

    const defaultFields = {
        name: '',
        email: '',
        password: '',
        cel: '',
    };
    const registerFieldsStructure: Record<string, any> = {
        objectName: 'registerFields',
        fields: [
            ['name', 'string'],
            ['email', 'string'],
            // ['password', 'string'],
            ['cel', 'string']
        ]
    };
    const loginFieldsStructure: Record<string, any> = {
        objectName: 'loginFields',
        fields: [
            ['email', 'string'],
            // ['password', 'string'],
        ]
    };
    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [clientFields, setClientFields] = useState(defaultFields);
    const [errorsFields, setErrorFields] = useState([]); // used by validation
    const clientActions: ClientActions = new ClientActions();

    const onChangeField = (fieldName: string, value: string) => {
        setClientFields({ ...clientFields, [fieldName]: value })
    }

    const changeAccess = (index: number) => {
        setErrorFields([]);
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
        let registerFields: IClient = {
            username: clientFields.name,
            cel: clientFields.cel,
            email: clientFields.email,
            name: clientFields.name,
            password: clientFields.password
        }
        if (validate.validateFields(registerFields, setErrorFields, [registerFieldsStructure])) {
            let clientResponse = await clientActions.add(registerFields);
            if (typeof (clientResponse) !== 'string') {
                clientCookie(clientResponse);
                props.onClientLogged(clientResponse);
                setSuccessMessage('Te has registrado con exitosamente')
            } else {
                setErrorMessage(clientResponse);
            }
        }
    }

    function clientCookie(client: IClient){
        document.cookie
        

    }

    // LOGIN
    const login = async () => {
        hideMessages();
        let loginFields = {
            email: clientFields.email,
            password: clientFields.password
        }
        if (validate.validateFields(loginFields, setErrorFields, [loginFieldsStructure])) {
            let response = await clientActions.login(loginFields);
            console.log('respuesta de clientaccess login ', response, typeof (response));
            if (typeof (response) !== 'string') {
                props.onClientLogged(response);
                setSuccessMessage('Has iniciado sesion con exito');
            } else {
                setErrorMessage(response);
            }
        }
    }

    const getAccessByMode = () => {
        switch (accessMode) {
            case 0:
                return (
                    <div className="login-box">
                        <form>
                            <TextField
                                label="Email"
                                name="email"
                                defaultValue={clientFields.email}
                                value={clientFields.email}
                                error={validate.get('loginFields.email', errorsFields) || ''}
                                onChange={onChangeField} />
                            {/* <TextField
                                label="Contraseña"
                                name="password"
                                defaultValue={clientFields.password}
                                value={clientFields.password}
                                error={validate.get('loginFields.password', errorsFields) || ''}
                                onChange={onChangeField} /> */}
                            <p className="error_message">{errorMessage}</p>
                            <p className="success_message">{successMessage}</p>
                            <Button
                                onClick={() => {
                                    login();
                                }}
                                className="access_btn art_experience-button_outlined"
                                label="Acceder" />
                        </form>
                        <p className="art_experience-text-light title">Si no estas registrado, ingresa AQUI</p>
                        <Button
                            onClick={() => {
                                changeAccess(1);
                            }}
                            className="access_btn art_experience-button_outlined"
                            label="Registrate Aqui"
                        />
                    </div>
                );
                break;
            case 1:
                return (
                    <div className="register-box">
                        <form>
                            <TextField
                                label="Nombre"
                                defaultValue={clientFields.name}
                                value={clientFields.name}
                                name="name"
                                error={validate.get('registerFields.name', errorsFields) || ''}
                                onChange={onChangeField} />
                            <TextField
                                label="Email"
                                defaultValue={clientFields.email}
                                value={clientFields.email}
                                name="email"
                                error={validate.get('registerFields.email', errorsFields) || ''}
                                onChange={onChangeField} />
                            {/* <TextField
                                label="Contraseña"
                                type="password"
                                defaultValue={clientFields.password}
                                value={clientFields.password}
                                error={validate.get('registerFields.password', errorsFields) || ''}
                                name="password"
                                onChange={onChangeField} /> */}
                            <TextField
                                label="Celular / Telefono"
                                value={clientFields.cel}
                                name="cel"
                                error={validate.get('registerFields.cel', errorsFields) || ''}
                                onChange={onChangeField} />
                            <p className="error_message">{errorMessage}</p>
                            <p className="success_message">{successMessage}</p>
                            <Button
                                onClick={() => {
                                    register();
                                }}
                                className="access_btn art_experience-button_outlined"
                                label="Registrarse"
                            />
                        </form>
                        <p className="art_experience-text-light title">Si ya estas registrado accede AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(0);
                            }}
                            className="access_btn art_experience-button_outlined"
                            label="Accede Aqui"
                        />
                    </div>
                );
                break;
        }
    }

    return (
        <div className="client_info-box">
            {getAccessByMode()}
        </div>
    );
}
