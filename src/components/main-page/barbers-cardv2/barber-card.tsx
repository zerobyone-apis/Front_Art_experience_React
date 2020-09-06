import React, { useContext, useState, useEffect, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Divider } from '../../divider/divider';
import { ContainerPage } from '../container-page/container-page';
import './barbers-card.scss';
import '../../../styles/theme.scss';
import '../../../styles/effects.scss';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export const BarbersCard = (props: {
    barbers: any[],
    title: string,
    subTitle: string
}) => {

    const [selectedBarber, setSelectedBarber] = useState(undefined);
    const [effects, setEffects] = useState('');

    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const BarberItem = (props: {
        img: any,
        name: string,
        info: string,
        key?: number,
        barber?: any
    }) => {
        const {
            // @ts-ignore
            getTheme,
        } = useContext(ThemeContext);
        return (
            <div className={`barber-item`} key={props.key}>
                <img
                    onMouseEnter={() => {
                        setEffects('effect-slide-right');
                        setSelectedBarber(props.barber);
                    }}
                    onMouseLeave={() => { setEffects('') }}
                    className={`barber-img`}
                    src={props.img} alt="" />
                <p className={`barber-name text text-light`}>{props.name}</p>
            </div>
        )
    }

    const getBarbers = () => {
        return props.barbers.map((barber, i) =>
            <div className={`${barber === selectedBarber ? 'selected' : null}`}>
                <BarberItem key={i}
                    barber={barber}
                    name={barber.name}
                    info={barber.info}
                    img={barber.urlProfileImage}
                />
            </div>
        )
    }

    const BarberImage = (props: { instagram: string, facebook: string }) => {
        return <Fragment>
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
    }


    return (
        <Divider
            title="Nuestros Barberos"
            img="https://scontent.fmvd4-1.fna.fbcdn.net/v/t1.0-9/s960x960/45230851_310326229560512_8082084365997178880_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=LwkdhjYPttcAX8sw6hk&_nc_ht=scontent.fmvd4-1.fna&_nc_tp=7&oh=e90cde8ea10295ce8a00a64d7e1cae1a&oe=5F565319"
            align="left"
            className="divider"
        >
            <div className="barber-card">
                <div className="barbers-items">
                    <p className="help-action">Barberos</p>
                    {getBarbers()}
                </div>
                <div className={`barber-info`}>
                    {selectedBarber ?
                        (
                            <ContainerPage
                                className={`barber-container ${effects}`}
                                imgClassName={``}
                                align="left"
                                title={selectedBarber.name}
                                img={selectedBarber.urlProfileImage}
                                info={selectedBarber.barberDescription}
                                imgFooter={<BarberImage facebook={selectedBarber.facebook} instagram={selectedBarber.instagram} />}
                            />
                        ) : (
                            <ContainerPage
                                className="barber-container"
                                align="left"
                                title={"Nuestros Barberos"}
                                info={"Nuestro personal se conforma de profesionales y apacionados por su trabajo, demostrando con cada corte la calidez, y por sobre todo la atencion personal, adaptandose a los pedidos de nuestros clientes."}
                                img={"https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C"} />
                        )}
                </div>
            </div>
        </Divider>
    )
}
