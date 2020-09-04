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
            img="https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319"
            align="left">
            <div className="divider-content">
                <div className="services-card">
                    {getServices()}
                </div>
            </div>
        </Divider>
    )
}