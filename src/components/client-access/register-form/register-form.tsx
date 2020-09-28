import React, { useState, useContext } from 'react';
import { ValidationForm } from '../../validation-form/validation-form';
import { TextField } from '../../text-field/text-field';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import ClientActions from '../../../actions/Client.actions';
import { IClient } from '../../../types/Client.type';
import './register-form.scss';
import '../../../styles/theme-buttons.scss';

export const RegisterForm = (props: {
    // onClientRegister: (response: any) => void,
    // onCompeteFields: any
}) => {
    const defaultRegisterFields = {
        name: '',
        email: '',
        password: '',
        password2: '',
        cel: '',
    };

    const baseMessage = {
        value: '',
        isError: false
    }

    const [registerFields, setRegisterFields] = useState(defaultRegisterFields);
    const [message, setMessage] = useState(baseMessage)

    const onChangeRegisterField = (value: string, fieldName: string) => {
        setRegisterFields({ ...registerFields, [fieldName]: value })
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

    // REGISTER
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

    return (
        <div className="register-box">
            <ValidationForm
                objectTest={registerFields}
                buttonLabel="Registrarse"
                buttonClassName="access_btn theme-button-outlined"
                equalFields={[
                    { field1: 'password', field2: 'password2', error: 'Las contraseñas no coinciden' }]}
                onClick={() => {
                    register()
                }}
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
            {message.isError ? (
                <p className="error_message">{message.value}</p>
            ) : (
                    <p className="success_message">{message.value}</p>
                )
            }
        </div>
    )
}
