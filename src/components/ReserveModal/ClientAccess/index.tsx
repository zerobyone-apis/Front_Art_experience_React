import React, { useState } from 'react';

import { TextField } from '../../TextField';
import { Button } from '../../Button';
// actions
import ClientActions from '../../../actions/Client.actions';
import { IClient } from '../../../types/Client.type'
// styles
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
        phone: '',
    };

    const [accessMode, setAccessMode] = useState(0);
    const [clientFields, setClientFields] = useState(defaultFields);
    const clientActions: ClientActions = new ClientActions();

    const onChangeField = (fieldName: string, value: string) => {
        setClientFields({ ...clientFields, [fieldName]: value })
    }

    // REGISTER
    const register = async () => {
        let newClient: IClient = {
            username: clientFields.name,
            cel: clientFields.phone,
            email: clientFields.email,
            name: clientFields.name,
            password: clientFields.password
        }
        let client = await clientActions.add(newClient);

        props.onClientLogged(client);
    }
    // LOGIN
    const login = async () => {
        // let clientResponse = await clientActions.get(clientFields.email, clientFields.password);
        // console.log('login client access', clientResponse)
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
                                onChange={onChangeField} />
                            <TextField
                                label="Contraseña"
                                name="password"
                                defaultValue={clientFields.password}
                                value={clientFields.password}
                                onChange={onChangeField} />
                            <Button
                                onClick={() => {
                                    login();
                                }}
                                className="access_btn art_experience-button"
                                label="Acceder" />
                        </form>
                        <p className="title">Si no estas registrado, ingresa AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(1);
                            }}
                            className="access_btn art_experience-button"
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
                                name="name"
                                defaultValue={clientFields.name}
                                value={clientFields.name}
                                onChange={onChangeField} />
                            <TextField
                                label="Email"
                                name="email"
                                defaultValue={clientFields.email}
                                value={clientFields.email}
                                onChange={onChangeField} />
                            <TextField
                                label="Contraseña"
                                name="password"
                                defaultValue={clientFields.password}
                                value={clientFields.password}
                                onChange={onChangeField} />
                            <TextField
                                label="Celular / Telefono"
                                name="phone"
                                value={clientFields.phone}
                                onChange={onChangeField} />
                            <Button
                                onClick={() => {
                                    register();
                                }}
                                className="access_btn art_experience-button"
                                label="Registrarse"
                            />
                        </form>
                        <p className="title">Si ya estas registrado accede AQUI</p>
                        <Button
                            onClick={() => {
                                setAccessMode(0);
                            }}
                            className="access_btn art_experience-button"
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
