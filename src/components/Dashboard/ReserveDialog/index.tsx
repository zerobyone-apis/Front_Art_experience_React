import React, { useEffect, useState } from 'react';
import { DialogModal } from '../../DialogModal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { Button } from '../../Button'
import moment from 'moment';
import './ReserveDialog.scss';
import '../../../styles/ArtExperienceButtons.scss'

export const ReserveDialog = (props: {
    reserve: IReserve,
    onClose: any
}) => {
    const [showDialog, setShowDialog] = useState(false);
    // const [reserve, setReserve] = useState(props.reserve || {});
    const reserveActions: ReserveActions = new ReserveActions();

    return (
        <DialogModal
            className="reserve-dialog"
            title="Control de Reserva"
            showModal={showDialog}
            onClose={props.onClose}>
            <div className="reserve-modal">
                {/* <p>{JSON.stringify(props.reserve)}</p> */}
                <div className="reserve_data-box">
                    <p className="reserve_info">
                        {`Fecha: ${
                            props.reserve.startTimeFront
                            }`}
                    </p>
                    <p className="reserve_info">{`Nombre del cliente: ${props.reserve.nameClient}`}</p>
                    <p className="reserve_info">{`Celular/Telefono del cliente: ${props.reserve.celClient}`}</p>
                    <p className="reserve_info">{`Email del cliente: ${props.reserve.mailClient}`}</p>
                    <p className="reserve_info">{`Servicio: ${props.reserve.workToDo}`}</p>
                    {/* <p className="reserve_info">{`Barbero: ${props.reserve.}`}</p> */}
                    <p className="reserve_info">{`Horario: ${props.reserve.startTimeFront.substr(11)}`}</p>
                    <p className="reserve_info">{`Costo: ${props.reserve.totalCost}`}</p>
                </div>
            </div>

            <div className="footer">
                <div className="footer_right-box">
                    <Button className="footer-button art_experience-button_outlined" label="Finalizar" onClick={() => { }} />
                    <Button className="footer-button art_experience-button_outlined" label="Cancelar" onClick={() => { }} />
                </div>
            </div>
        </DialogModal>
    );
}
