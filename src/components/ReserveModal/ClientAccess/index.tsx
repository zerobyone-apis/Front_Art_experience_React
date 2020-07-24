import React, { useState, useContext } from 'react';

import { TextField } from '../../TextField';
import { Button } from '../../Button';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import { IClient } from '../../../types/Client.type';
import ClientActions from '../../../actions/Client.actions';
import Validation from '../../../utils/Validation';
import './ClientAccess.scss';
import '../../../styles/ArtExperienceButtons.scss';
import '../../../styles/ArtExperienceFonts.scss';

export const ClientAccess = (props: {
    onClientLogged: any
}) => {
    const defaultFields = {
        name: '',
        email: '',
        password: '',
        cel: '',
    };
    const [accessMode, setAccessMode] = useState(0); // 0 - Login / 1 - register
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [clientFields, setClientFields] = useState(defaultFields);
    const [errorsFields, setErrorFields] = useState([]); // used by validation
    const clientActions: ClientActions = new ClientActions();

    // Contexts
    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);
    const {
        // @ts-ignore
        userIsLogged,
        setUserData
    } = useContext(UserContext);

    const validate: Validation = new Validation();


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
    const onChangeField = (value: string, fieldName: string) => {
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
        const registerFields: IClient = {
            username: clientFields.name,
            cel: clientFields.cel,
            email: clientFields.email,
            name: clientFields.name,
            password: clientFields.password
        }
        if (validate.validateFields(registerFields, setErrorFields, [registerFieldsStructure])) {
            setDisabledButton(true);
            const clientResponse = await clientActions.add(registerFields);
            setDisabledButton(false);
            if (typeof (clientResponse) !== 'string') {
                clientCookie(clientResponse);
                props.onClientLogged(clientResponse);
                setUserData(clientResponse);
                setSuccessMessage('Te has registrado con exitosamente')
            } else {
                setErrorMessage(clientResponse);
            }
        }
    }

    //Do feature to save the client object to cookie 
    function clientCookie(client: IClient) {
        document.cookie
    }

    // LOGIN
    const login = async () => {
        hideMessages();
        const loginFields = {
            email: clientFields.email,
            password: clientFields.password
        }
        if (validate.validateFields(loginFields, setErrorFields, [loginFieldsStructure])) {
            setDisabledButton(true);
            const response = await clientActions.login(loginFields);
            setDisabledButton(false);
            if (typeof (response) !== 'string') {
                props.onClientLogged(response);
                setUserData(response);
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
