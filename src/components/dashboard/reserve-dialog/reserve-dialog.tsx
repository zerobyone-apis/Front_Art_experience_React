import React, { useState } from 'react';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { ValidationForm } from '../../validation-form/validation-form';
import { Button } from '../../button/button';
import { TextField } from '../../text-field/text-field';
import moment from 'moment';
import './reserve-dialog.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const ReserveDialog = (props: {
    reserve: IReserve,
    onClose: any
}) => {
    const baseReserve: IReserve = {
        barberOrHairdresserId: -1,
        celClient: '',
        clientId: -1,
        mailClient: '',
        nameClient: '',
        priceWork: 0,
        startTime: '',
        additionalCost: 0,
    }
    const [showDialog, setShowDialog] = useState(false);
    const [reserve, setReserve] = useState(props.reserve || baseReserve)
    const reserveActions: ReserveActions = new ReserveActions();

    const onChangeReserve = (value: string, fieldName: string) => {
        setReserve({ ...reserve, [fieldName]: value })
    }

    return (
        <DialogModal
            className="reserve-dialog"
            title="Control de Reserva"
            showModal={showDialog}
            onClose={props.onClose}>
            <div className="reserve-modal">
                <div className="reserve_data-box">
                    <p className="reserve_info effect-slide_left">Datos del Cliente</p>
                    <ValidationForm
                        objectTest={reserve}
                        buttonLabel="Guardar Cambios"
                        buttonClassName="access_btn theme-button-outlined"
                        onClick={() => {
                            // login()
                            alert('click')
                        }}
                    >
                        <TextField
                            value={reserve.nameClient}
                            name="nameClient"
                            type="string"
                            required={true}
                            label="Nombre"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <TextField
                            value={reserve.mailClient}
                            name="mailClient"
                            type="email"
                            required={true}
                            label="Email"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <TextField
                            value={reserve.celClient}
                            name="celClient"
                            type="number"
                            required={true}
                            label="Celular"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <p className="reserve_info">Datos de la Reserva</p>
                        <TextField
                            value={reserve.startTimeFront}
                            name="startTimeFront"
                            type="allow"
                            required={true}
                            label="Fecha y hora"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <TextField
                            value={reserve.barberOrHairdresserId}
                            name="barberOrHairdresserId"
                            type="allow"
                            required={true}
                            label="Barbero"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <TextField
                            value={reserve.workToDo}
                            name="workToDo"
                            type="allow"
                            required={true}
                            label="Servicio"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                        <TextField
                            value={reserve.totalCost}
                            name="totalCost"
                            type="number"
                            required={true}
                            label="Costo Total"
                            className="theme-text_field--dark"
                            onChange={onChangeReserve} />
                    </ValidationForm>
                </div>
            </div>

            <div className="footer">
                <div className="footer_right-box">
                    <Button className="footer-button theme-button-outlined" label="Finalizar" onClick={() => { }} />
                    <Button className="footer-button theme-button-outlined" label="Cancelar" onClick={() => { }} />
                </div>
            </div>
        </DialogModal >
    );
}