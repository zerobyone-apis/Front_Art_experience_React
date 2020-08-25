import React, { useContext } from 'react';
import './services-list.scss';
import '../../../styles/ArtExperienceButtons.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const ServiceItem = (props: {
    name: string,
    cost: string,
    selected?: boolean,
    onSelect?: any,
    key?: number,
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`service effect-opacity ${props.selected ? 'selected-service' : null}`}
            onClick={() => {
                props.onSelect ? props.onSelect() : null;
            }}
            key={props.key}
        >
            <div className="name">
                <p className={`text text-${getTheme()}`}>
                    {props.name}
                </p>
            </div>
            <div className={`price text text-${getTheme()}`}>
                <p>
                    ${props.cost}
                </p>
            </div>
        </div>
    )
}

export const ServicesList = (props: {
    value: any,
    setService: any,
    services: any[]
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className="services-box">
            <div className="list_services-box effect-slide_top">
                {props.services.map((service, i) => {
                    return (
                        <div
                            className={`service effect-opacity ${props.value.name === service.name ? 'selected-service' : null}`}
                            onClick={() => {
                                props.setService(service);
                            }}
                            key={i}
                        >
                            <div className="name">
                                <p className={`text text-${getTheme()}`}>
                                    {service.name}
                                </p>
                            </div>
                            <div className={`price text text-${getTheme()}`}>
                                <p>
                                    ${service.cost}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}