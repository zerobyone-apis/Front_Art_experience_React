import React, { useState, useContext } from 'react';
import { ValidationForm } from '../../ValidationForm';
import { TextField } from '../../TextField';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import ClientActions from '../../../actions/Client.actions';

export const LoginForm = (props: {
    onClientLogged: (response: any) => void
}) => {
    const defaultLoginFields = {
        email: '',
        password: '',
    };

    const baseMessage = {
        value: '',
        isError: false
    }

    const [loginFields, setLoginFields] = useState(defaultLoginFields);
    const [message, setMessage] = useState(baseMessage)

    const onChangeLoginField = (value: string, fieldName: string) => {
        console.log(value, ' - ', fieldName)
        setLoginFields({ ...loginFields, [fieldName]: value })
    }

    const clientActions: ClientActions = new ClientActions();

    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);
    const {
        // @ts-ignore
        setUserData
    } = useContext(UserContext);

    // LOGIN
    const login = async () => {
        setMessage({ value: '', isError: false }); //clear
        const fields = {
            email: loginFields.email,
            password: loginFields.password
        }
        setDisabledButton(true);
        const response = await clientActions.login(fields);
        if (response) {
            props.onClientLogged(response);
            setUserData(response);
            setMessage({ value: 'Has iniciado sesion con exito', isError: false });
        } else {
            setMessage({ value: 'No se pudo iniciar sesion, verifique email y contaseña', isError: true });
        }
        setDisabledButton(false);
    }

    return (
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
            {message.isError ? (
                <p className="error_message">{message.value}</p>
            ) : (
                    <p className="success_message">{message.value}</p>
                )
            }
        </div>
    )
}