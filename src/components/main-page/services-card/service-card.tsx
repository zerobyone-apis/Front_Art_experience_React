import React, { useContext } from 'react';
import { Card } from '../../card/card';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import './services-card.scss';
import '../../../styles/theme.scss';

export const ServiceItem = (props: {
    key?: number,
    icon: any,
    name: string,
    info: string
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`service-item`} key={props.key}>
            {props.icon}
            <p className={`service-name text text-light`}>{props.name}</p>
            <p className={`service-info text text-light`}>{props.info}</p>
        </div>
    )
}

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
            <ServiceItem key={i}
                name={service.name}
                info={service.info}
                icon={service.icon}
            />
        )
    }

    return (
        <Divider
            title="Brindamos servicios de alto nivel, teniendo en cuenta sus necesidades"
            img=""
            align="left"
            className="dark service-divider"
        >
            <div className="divider-content">
                <div className="services-card">
                    {getServices()}
                </div>
            </div>
        </Divider>
    )
}