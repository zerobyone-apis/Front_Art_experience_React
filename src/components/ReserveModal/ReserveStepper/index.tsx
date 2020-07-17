import React from 'react';
import moment from 'moment';
import './ReserveStepper.scss';

import { CalendarBox } from '../CalendarBox';
import { HourBox } from '../HourBox';
import { ServicesList } from '../ServicesList';
import { BarbersList } from '../BarbersList';
import { ClientAccess } from '../ClientAccess';

export const ReserveStepper = (props: {
    wizard: number,
    onClientLogged: any,
    serviceStep: {
        services: any,
        selectedService: any,
        setService: any
    },
    barberStep: {
        barbers: any,
        selectedBarber: any,
        setBarber: any
    }
    timeStep: {
        reserveDate: any,
        setDate: any,
        reserveHour: any,
        setHour: any
    },
}) => {



    switch (props.wizard) {
        case 0:
            return (
                // Step 0: select service
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Seleccione el servicio que se desea realizar</p>
                    </div>
                    <ServicesList
                        services={props.serviceStep.services}
                        value={props.serviceStep.selectedService}
                        setService={props.serviceStep.setService}
                    />
                </div>
            );
            break;
        case 1:
            return (
                // Step 1: select barber
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Seleccione el Barbero</p>
                    </div>
                    <BarbersList
                        value={props.barberStep.selectedBarber}
                        barbers={props.barberStep.barbers}
                        setBarber={props.barberStep.setBarber}
                    />
                </div>
            );
            break;
        case 2:
            return (
                // Step 2: select date and hour
                <div className="reserve-step">
                    <div className="step-title">
                        <p >Seleccione fecha y hora</p>
                    </div>
                    <div className="time-box">
                        <CalendarBox
                            value={props.timeStep.reserveDate}
                            onSelectDate={props.timeStep.setDate} />
                        <HourBox
                            value={props.timeStep.reserveHour}
                            onSelectHour={props.timeStep.setHour} />
                    </div>
                </div>
            );
            break;
        case 3:
            return (
                // Step 3 - Client info
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Ingrese sus datos personales</p>
                    </div>
                    <ClientAccess onClientLogged={props.onClientLogged}
                    />
                </div>
            );
            break;
        case 4:
            return (
                // Step 4 - Confirm data
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Confirmacion de reserva</p>
                    </div>
                    <div className="confirm_data-box">
                        {/* <p className="confirm_info">Nombre: {props.clientStep.clientName}</p>
                        <p className="confirm_info">Telefono: {props.clientStep.clientPhone}</p> */}
                        <p className="confirm_info">
                            {`Fecha de reservacion: ${
                                moment(props.timeStep.reserveDate).format("DD/MM/YYYY")
                                }`}
                        </p>
                        <p className="confirm_info">{`Hora: ${props.timeStep.reserveHour}`}</p>
                        <p className="confirm_info">{`Barbero: ${props.barberStep.selectedBarber ? props.barberStep.selectedBarber.name : ''}`}</p>
                        <p className="confirm_info">{`Servicio: ${props.serviceStep.selectedService ? props.serviceStep.selectedService.name : 'No se selecciono servicio'}`}</p>

                    </div>
                </div>
            );
            break;
    }
}