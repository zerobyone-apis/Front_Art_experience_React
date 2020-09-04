import React, { useContext, useState, Fragment } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Card } from '../../card/card';
import { Divider } from '../../divider/divider';
import './barbers-card.scss';
import '../../../styles/theme.scss';
import { ContainerPage } from '../container-page/container-page';

export const BarberItem = (props: {
    img: any,
    name: string,
    info: string,
    key?: number,
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`barber-item`} key={props.key}>
            <img className="barber-img" src={props.img} alt="" />
            <p className={`barber-name text text-light`}>{props.name}</p>
        </div>
    )
}

export const BarbersCard = (props: {
    barbers: any[],
    title: string,
    subTitle: string
}) => {

    const [selectedBarber, setSelectedBarber] = useState(undefined);

    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getBarbers = () => {
        return props.barbers.map((barber, i) =>
            <div onMouseEnter={() => { setSelectedBarber(barber) }} className={`${barber === selectedBarber ? 'selected' : null}`}>
                <BarberItem key={i}
                    name={barber.name}
                    info={barber.info}
                    img={barber.urlProfileImage}
                />
            </div>
        )
    }

    return (
        <div className="barber-card light">
            <div className="barbers-items">
                {getBarbers()}
            </div>
            <div className="barber-info">
                {selectedBarber ?
                    (
                        <ContainerPage
                            align="left"
                            title={selectedBarber.name}
                            info={selectedBarber.barberDescription}
                            img={selectedBarber.urlProfileImage} />
                    ) : (
                        <ContainerPage
                            align="left"
                            title={"Nuestros Barberos"}
                            info={"ArtExperience barberos"}
                            img={"https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C"} />
                    )}
            </div>
        </div>
    )
}
