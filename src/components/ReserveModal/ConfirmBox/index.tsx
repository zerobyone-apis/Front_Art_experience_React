import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './ConfirmBox.scss';
import '../../../styles/theme.scss';
import '../../../styles/Effects.scss';
import { BarberItem } from '../BarbersList';
import { ServiceItem } from '../ServicesList';

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
                    <p className={`confirm_info text text-${getTheme()}`}>{`Servicio`}</p>
                    <ServiceItem
                        name={props.service.name}
                        cost={props.service.cost}
                        selected={true}
                    />
                    <p className={`confirm_info text text-${getTheme()}`}>{`Barbero`}</p>
                    <BarberItem
                        name={props.barber.name}
                        img={props.barber.urlProfileImage}
                        selected={true}
                    />
                    <p className={`confirm_info text text-${getTheme()}`}>
                        {`Fecha de reservacion: ${props.date}`}
                    </p>
                    <p className={`confirm_info text text-${getTheme()}`}>{`Horario: ${props.hour}`}</p>
                    <p className={`confirm_info text text-${getTheme()}`}>{`Costo: $${props.service.cost}`}</p>

                </div>
            </div>
        </div>
    );
}