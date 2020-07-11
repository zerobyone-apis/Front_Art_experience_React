import React from 'react';
import './ServicesList.scss';
import '../../../styles/ArtExperienceButtons.scss';

export const ServicesList = (props: {
    value: any,
    setService: any,
    services: any[]
}) => {
    return (
        <div className="services-box">
            <div className="list_services-box">
                {props.services.map((service, i) => {
                    return (
                        <div
                            className={`service ${props.value.name === service.name ? 'selected-service' : null}`}
                            onClick={() => {
                                props.setService(service);
                            }}
                            key={i}
                        >
                            <div className="name">
                                <p>
                                    {service.name}
                                </p>
                            </div>
                            <div className="price">
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