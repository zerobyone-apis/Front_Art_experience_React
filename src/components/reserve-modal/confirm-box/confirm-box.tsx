import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './confirm-box.scss';
import '../../../styles/theme.scss';
import '../../../styles/effects.scss';
import { BarberItem } from '../barbers-list/barber-list';
import { ServiceItem } from '../services-list/services-list';

export const ConfirmBox = (props: {
    hour: string,
    date: string,
    service: any,
    barber: any,
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className="confirm_data-box effect-slide_top">
            <div className="effect-slide_top">
                <div className="service-box">
                    <ServiceItem
                        name={`Servicio`}
                        cost={`${props.service.name}`}
                        selected={false}
                    />
                    <ServiceItem
                        name={`Barbero`}
                        cost={`${props.barber.name}`}
                        selected={false}
                    />
                    <ServiceItem
                        name={`Fecha de reservacion`}
                        cost={`${props.date}`}
                        selected={false}
                    />
                    <ServiceItem
                        name={`Horario`}
                        cost={`${props.hour}`}
                        selected={false}
                    />
                    <ServiceItem
                        name={`Costo`}
                        cost={`$${props.service.cost}`}
                        selected={true}
                    />
                </div>
            </div>
        </div >
    );
}