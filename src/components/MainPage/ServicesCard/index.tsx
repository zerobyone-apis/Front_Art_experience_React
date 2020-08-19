import React, { useContext } from 'react';
import { Card } from '../../Card';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './ServicesCard.scss';

export const ServicesCard = (props: {
    services: any[],
    title: string,
    subTitle: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getServices = () => {
        return props.services.map((service, i) =>
            <div className={`service-item ${getTheme()}`} key={i}>
                {service.icon}
                <p className={`service-name text-${getTheme()}`}>{service.name}</p>
                <p className={`service-info text-${getTheme()}`}>{service.info}</p>
            </div>
        )
    }

    return (
        <Card title={props.title} subtitle={props.subTitle}>
            {getServices()}
        </Card>
    )

}