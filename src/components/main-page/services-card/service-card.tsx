import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import './services-card.scss';
import '../../../styles/theme.scss';

export const ServiceItem = (props: {
  key?: number;
  icon: any;
  name: string;
  info: string;
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);
  return (
    <div className={`service-item`} key={props.key}>
      {props.icon}
      <p className={`service-name text text-light`}>{props.name}</p>

      <div className={`service-info text text-light`}>
        {props.info.split('\n').map((line, i) => {
          return <p key={i}>{line}</p>;
        })}
      </div>


    </div>
  );
};

export const ServicesCard = (props: {
  services: any[];
  title: string;
  subTitle: string;
}) => {
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const getServices = () => {
    return props.services.map((service, i) => (
      <div className="service-item" key={i}>
        <ServiceItem
          name={service.name}
          info={service.info}
          icon={service.icon}
        />
      </div>
    ));
  };

  return (
    <Divider
      title="Brindamos Servicios de Calidad y Asesoramiento Personalizado"
      //img=""
      img="https://i.ibb.co/DfFncm2/Whats-App-Image-2020-09-26-at-17-38-45-1.jpg"
      align="left"
      className="service-divider"
    >
      <div className="divider-content">
        <div className="services-card">{getServices()}</div>
      </div>
    </Divider>
  );
};
