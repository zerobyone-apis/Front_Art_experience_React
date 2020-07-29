import React, { useState, useContext } from 'react';
import { ValidationForm } from '../../ValidationForm';
import { TextField } from '../../TextField';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import { UserContext } from '../../../contexts/UserContext';
import ClientActions from '../../../actions/Client.actions';
import { IClient } from '../../../types/Client.type';
import './RegisterForm.scss';

export const RegisterForm = (props: {
    onClientRegister: (response: any) => void
}) => {
    const defaultFields = {
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

    const [fields, setFields] = useState(defaultFields);
    const [message, setMessage] = useState(baseMessage)

    const onChangeField = (value: string, fieldName: string) => {
        setFields({ ...fields, [fieldName]: value })
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

    const register = async () => {
        setMessage({ value: '', isError: false }); //clear
        const data: IClient = {
            username: fields.name,
            cel: fields.cel,
            email: fields.email,
            name: fields.name,
            password: fields.password,
            password2: fields.password2
        }
        setDisabledButton(true);
        const response = await clientActions.add(data);
        setDisabledButton(false);
        if (response) {
            props.onClientRegister(response);
            setUserData(response);
            setMessage({ value: 'Registro realizado con exito', isError: false });
        } else {
            setMessage({ value: 'No se pudo realizar el registro, vuelva a intentarlo', isError: true });
        }
    }

    return (
        <div className="register-box">
            <ValidationForm
                objectTest={fields}
                buttonLabel="Registrarse"
                buttonClassName="access_btn art_experience-button_outlined"
                equalFields={[{ field1: 'password', field2: 'password2', error: 'Las contraseñas no coinciden' }]}
                onClick={() => {
                    register()
                }}
            >
                <TextField
                    value={fields.name}
                    name="name"
                    required={true}
                    label="Nombre"
                    onChange={onChangeField} />
                <TextField
                    value={fields.email}
                    name="email"
                    type="email"
                    required={true}
                    label="Email"
                    onChange={onChangeField} />
                <TextField
                    value={fields.cel}
                    name="cel"
                    type="number"
                    required={true}
                    label="Celular / Telefono"
                    onChange={onChangeField} />
                <TextField
                    value={fields.password}
                    name="password"
                    type="password"
                    required={true}
                    label="Contraseña"
                    onChange={onChangeField} />
                <TextField
                    value={fields.password2}
                    name="password2"
                    type="password"
                    required={true}
                    label="Repita Contraseña"
                    onChange={onChangeField} />
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