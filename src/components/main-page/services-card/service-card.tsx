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
        <Divider img="https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C"
            align="left">
            <div className="divider-content">
                <h1 className="divider-title">Brindamos servicios de alto nivel, teniendo en cuenta sus necesidades</h1>
                <div className="services-card">
                    {getServices()}
                </div>
            </div>
        </Divider>
    )
}