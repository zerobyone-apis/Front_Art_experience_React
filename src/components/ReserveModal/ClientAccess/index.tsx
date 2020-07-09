import React from 'react';
import { TextField } from '../../TextField';
import './ClientAccess.scss';

export const ClientAccess = (props: {
    clientEmail: string,
    clientName: string,
    clientPassword: string,
    clientPhone: string,
    setReserveFields: any,
}) => {
    return (
        <div className="client_info-box">
            <div className="login-box">
                <p className="title">Si ya estas registrado, ingresa AQUI</p>
                <form>
                    <TextField
                        label="Email"
                        name="clientEmail"
                        defaultValue={props.clientEmail}
                        value={props.clientEmail}
                        onChange={props.setReserveFields} />
                    <TextField
                        label="Contraseña"
                        name="clientPassword"
                        defaultValue={props.clientPassword}
                        value={props.clientPassword}
                        onChange={props.setReserveFields} />
                </form>
            </div>

            <div className="register-box">
                <p className="title">Registrate AQUI</p>
                <form>
                    <TextField
                        label="Nombre"
                        name="clientName"
                        defaultValue={props.clientName}
                        value={props.clientName}
                        onChange={props.setReserveFields} />
                    <TextField
                        label="Email"
                        name="clientEmail"
                        defaultValue={props.clientEmail}
                        value={props.clientEmail}
                        onChange={props.setReserveFields} />
                    <TextField
                        label="Contraseña"
                        name="clientPassword"
                        defaultValue={props.clientPassword}
                        value={props.clientPassword}
                        onChange={props.setReserveFields} />
                    <TextField
                        label="Celular / Telefono"
                        name="clientPhone"
                        value={props.clientPhone}
                        onChange={props.setReserveFields} />
                </form>
            </div>

        </div>
    );
}
