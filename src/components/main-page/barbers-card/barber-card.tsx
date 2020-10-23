import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import {
  ContainerPage as Container,
  SubContainerImage,
} from '../../test/container-page/container-page';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { Text } from '../../text';
import { Card } from '../../card'
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
        <Text type="small" className="barber-name">{props.name}</Text>
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
    <Card
      title="Nuestros Barberos"
      background="https://i.ibb.co/R0Lxwsz/Whats-App-Image-2020-09-26-at-17-38-44.jpg"
      className="barber-card"
    >
      <Container
        className={`container-barber`}
        containerClassName={`${effects}`}
        leftContent={
          <div className="barbers-items">
            <Text type="small" className="help-action">Barberos</Text>
            {getBarbers()}
          </div>
        }
      >
        <SubContainerImage
          img={selectedBarber.urlProfileImage}
          title={selectedBarber.name}
          imgFooter={
            <BarberImage
              facebook={selectedBarber.facebook}
              instagram={selectedBarber.instagram}
            />
          }
        />
      </Container>
    </Card>

    // <Divider
    //   title="Nuestros Barberos"
    //   img="https://i.ibb.co/R0Lxwsz/Whats-App-Image-2020-09-26-at-17-38-44.jpg"
    //   align="left"
    //   className="divider"
    // >
    // </Divider>
  );
};
