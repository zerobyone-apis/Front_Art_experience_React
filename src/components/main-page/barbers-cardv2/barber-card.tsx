import React, { useContext, useState, useEffect, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
// import { ContainerPage } from '../container-page/container-page';
import {
  ContainerPage as Container,
  SubContainerInfo,
  SubContainerImage,
} from '../../test/container-page/container-page';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './barbers-card.scss';
import '../../../styles/theme.scss';
import '../../../styles/effects.scss';

export const BarbersCard = (props: {
  barbers: any[];
  title: string;
  subTitle: string;
}) => {
  const [selectedBarber, setSelectedBarber] = useState(props.barbers[0]);
  const [effects, setEffects] = useState('');
  const screenSize = useWindowSize();
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const BarberItem = (props: {
    img: any;
    name: string;
    info: string;
    key?: number;
    barber?: any;
  }) => {
    const {
      // @ts-ignore
      getTheme,
    } = useContext(ThemeContext);
    return (
      <div className={`barber-item`} key={props.key}>
        <img
          onMouseEnter={() => {
            setEffects(
              screenSize.size.width > 1100
                ? 'effect-slide-left'
                : 'effect-slide-top'
            );
            setSelectedBarber(props.barber);
          }}
          onMouseLeave={() => {
            setEffects('');
          }}
          className={`barber-img`}
          src={props.img}
          alt=""
        />
        <p className={`barber-name text text-light`}>{props.name || ''}</p>
      </div>
    );
  };

  const getBarbers = () => {
    return props.barbers.map((barber, i) => (
      <div
        key={i}
        className={`${barber === selectedBarber ? 'selected' : null}`}
      >
        <BarberItem
          barber={barber}
          name={barber.name}
          info={barber.info}
          img={barber.urlProfileImage}
        />
      </div>
    ));
  };

  const BarberImage = (props: { instagram: string; facebook: string }) => {
    return (
      <Fragment>
        <div className="employee-social">
          <a href={props.instagram}>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <FaInstagram className="employee-social-logo social-logo" />
          </a>
          <a href={props.facebook}>
            <FaFacebook className="employee-social-logo social-logo" />
          </a>
        </div>
      </Fragment>
    );
  };

  return (
    <Divider
      title="Nuestros Barberos"
      img="https://i.ibb.co/R0Lxwsz/Whats-App-Image-2020-09-26-at-17-38-44.jpg"
      align="left"
      className="divider"
    >
      <div className="barber-card">
        <Container
          className={`container-barber`}
          containerClassName={`${effects}`}
          leftContent={
            <div className="barbers-items">
              <p className="help-action">Barberos</p>
              {getBarbers()}
            </div>
          }
        >
          <SubContainerInfo
            title={selectedBarber.name}
            info={selectedBarber.barberDescription}
            cost={''}
          />
          <SubContainerImage
            img={selectedBarber.urlProfileImage}
            imgFooter={
              <BarberImage
                facebook={selectedBarber.facebook}
                instagram={selectedBarber.instagram}
              />
            }
          />
        </Container>
      </div>
    </Divider>
  );
};
