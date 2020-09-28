import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { TextField } from '../text-field/text-field';
import { ButtonContext } from '../../contexts/ButtonsContext';
import { UserContext } from '../../contexts/UserContext';
import { ValidationForm } from '../validation-form/validation-form';
import { IClient } from '../../types/Client.type';
import ClientActions from '../../actions/Client.actions';
import './client-access.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';

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
    const baseMessage = {
        value: '',
        isError: false,
    };

    const [accessMode, setAccessMode] = useState(1); // 1 - Login / 0 - register
    const [loginFields, setLoginFields] = useState(defaultLoginFields);
    const [registerFields, setRegisterFields] = useState(defaultRegisterFields);
    const [message, setMessage] = useState(baseMessage);

    const clientActions: ClientActions = new ClientActions();

    /* CONTEXTS */
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    const {
        // @ts-ignore
        disabled,
        setDisabledButton,
    } = useContext(ButtonContext);
    const {
        // @ts-ignore
        setUserData,
    } = useContext(UserContext);


    const onChangeLoginField = (value: string, fieldName: string) => {
        setLoginFields({ ...loginFields, [fieldName]: value });
    };
    const onChangeRegisterField = (value: string, fieldName: string) => {
        setRegisterFields({ ...registerFields, [fieldName]: value })
    }


    /* LOGIN */
    const login = async () => {
        setMessage({ value: '', isError: false }); //clear
        const fields = {
            email: loginFields.email,
            password: loginFields.password,
        };
        setDisabledButton(true);
        const response = await clientActions.login(fields);
        if (response) {
            props.onClientLogged(response);
            setUserData({ ...response.data.user, ...response.data.client });
            setMessage({ value: 'Has iniciado sesion con exito', isError: false });
        } else {
            setMessage({
                value: 'No se pudo iniciar sesion, verifique email y contaseña',
                isError: true,
            });
        }
        setDisabledButton(false);
    };

    /* REGISTER */
    const register = async () => {
        setMessage({ value: '', isError: false }); //clear
        const fields: IClient = {
            username: registerFields.name,
            cel: registerFields.cel,
            email: registerFields.email,
            name: registerFields.name,
            password: registerFields.password,
            password2: registerFields.password2
        }
        setDisabledButton(true);
        const response = await clientActions.add(fields);
        if (response) {
            if (response.status == 201) {
                // props.onClientRegister(response);
                props.onClientLogged(response);
                setUserData(response);
                setMessage({ value: 'Registro realizado con exito', isError: false });
            } else {
                setMessage({ value: response.statusText, isError: true });
            }
        } else {
            setMessage({ value: 'Ocurrio un error!, vuelva a intentarlo', isError: true });
        }
        setDisabledButton(false);
    }


    const LoginForm = () => {
        return (
            <ValidationForm
                objectTest={loginFields}
                buttonClassName="access_btn theme-button-outlined"
                onClick={() => login()}
                nextButtonLabel='Acceder'
                prevButtonLabel='Si no esta registrado, Acceda aqui'
                onPrevButtonClick={() => setAccessMode(0)}
            >
                <TextField
                    value={loginFields.email}
                    name="email"
                    type="email"
                    required={true}
                    label="Email o Numero Social"
                    className="theme-text_field--dark"
                    onChange={onChangeLoginField}
                />
                <TextField
                    value={loginFields.password}
                    name="password"
                    type="password"
                    required={true}
                    label="Contraseña"
                    className="theme-text_field--dark"
                    onChange={onChangeLoginField}
                />
            </ValidationForm>
        )
    }

    const RegisterForm = () => {
        return (
            <ValidationForm
                objectTest={registerFields}
                buttonClassName="access_btn theme-button-outlined"
                equalFields={[
                    { field1: 'password', field2: 'password2', error: 'Las contraseñas no coinciden' }]}
                onClick={() => register()}
                nextButtonLabel='Registrarse'
                prevButtonLabel='Si ya estas registrado, Acceda aqui'
                onPrevButtonClick={() => setAccessMode(1)}
            >
                <TextField
                    value={registerFields.name}
                    name="name"
                    required={true}
                    label="Nombre"
                    className="theme-text_field--dark"
                    onChange={onChangeRegisterField} />
                <TextField
                    value={registerFields.email}
                    name="email"
                    type="email"
                    required={true}
                    label="Email"
                    className="theme-text_field--dark"
                    onChange={onChangeRegisterField} />
                <TextField
                    value={registerFields.cel}
                    name="cel"
                    type="number"
                    required={true}
                    label="Celular / Telefono"
                    className="theme-text_field--dark"
                    onChange={onChangeRegisterField} />
                <TextField
                    value={registerFields.password}
                    name="password"
                    type="password"
                    required={true}
                    label="Contraseña"
                    className="theme-text_field--dark"
                    onChange={onChangeRegisterField} />
                <TextField
                    value={registerFields.password2}
                    name="password2"
                    type="password"
                    required={true}
                    label="Repita Contraseña"
                    className="theme-text_field--dark"
                    onChange={onChangeRegisterField} />
            </ ValidationForm>
        )
    }

    return (
        <div className="login-box">
            {message.isError ? (
                <p className="error_message">{message.value}</p>
            ) : (
                    <p className="success_message">{message.value}</p>
                )}
            {accessMode ? (<LoginForm />) : (<RegisterForm />)}
        </div>
    );
}
