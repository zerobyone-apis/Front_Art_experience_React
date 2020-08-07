import React, { useContext } from 'react';
import { ReserveTime } from '../ReserveTime';
// import { CalendarBox } from '../CalendarBox';
// import { HourBox } from '../HourBox';
import { ServicesList } from '../ServicesList';
import { BarbersList } from '../BarbersList';
import { UserContext } from '../../../contexts/UserContext'
import { IClient } from '../../../types/Client.type';
import { FaRegCalendarCheck } from 'react-icons/fa';
import moment from 'moment';
import './ReserveStepper.scss';

export const ReserveStepper = (props: {
    wizard: number,
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
    // context
    const {
        // @ts-ignore
        getUserData
    } = useContext(UserContext);

    const clientData: IClient = getUserData();

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
                    <ReserveTime />
                    {/* <div className="time-box">
                        <CalendarBox
                            value={props.timeStep.reserveDate}
                            onSelectDate={props.timeStep.setDate} />
                        <HourBox
                            hours={['14:00', "14:40", '15:20', '16:00', '16:40', '17:20']}
                            value={props.timeStep.reserveHour}
                            onSelectHour={props.timeStep.setHour} />
                    </div> */}
                </div>
            );
            break;
        // case 3:
        //     return (
        //         // Step 3 - Client info
        //         <div className="reserve-step">
        //             <div className="step-title">
        //                 <p>Ingrese sus datos personales</p>
        //             </div>
        //             <ClientAccess onClientLogged={props.onClientLogged}
        //             />
        //         </div>
        //     );
        //     break;
        case 3:
            return (
                // Step 4 - Confirm data
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Confirmacion de reserva</p>
                    </div>
                    <div className="confirm_data-box">
                        <p className="confirm_info">
                            {`Fecha de reservacion: ${
                                moment(props.timeStep.reserveDate).format("DD/MM/YYYY")
                                }`}
                        </p>
                        <p className="confirm_info">{`Nombre del cliente: ${clientData.username}`}</p>
                        <p className="confirm_info">{`Celular/Telefono del cliente: ${clientData.cel}`}</p>
                        <p className="confirm_info">{`Email del cliente: ${clientData.email}`}</p>
                        <p className="confirm_info">{`Servicio: ${props.serviceStep.selectedService ? props.serviceStep.selectedService.name : 'No se selecciono servicio'}`}</p>
                        <p className="confirm_info">{`Barbero: ${props.barberStep.selectedBarber ? props.barberStep.selectedBarber.name : ''}`}</p>
                        <p className="confirm_info">{`Horario: ${props.timeStep.reserveHour}`}</p>
                        <p className="confirm_info">{`Costo: ${props.serviceStep.selectedService ? `$${props.serviceStep.selectedService.cost}` : 'No se selecciono servicio'}`}</p>
                    </div>
                </div>
            );
            break;
        case 4:
            return (
                // Step 4 - Success reserve!
                <div className="reserve-step">
                    <div className="step-title">
                        <p>Reservacion - ArtExperience</p>
                    </div>
                    <div className="confirm_data-box">
                        <p className="confirm_info">Se ha realizado la reserva de forma exitosa!</p>
                        <FaRegCalendarCheck className="success-icon" />
                    </div>
                </div>
            );
    }

}