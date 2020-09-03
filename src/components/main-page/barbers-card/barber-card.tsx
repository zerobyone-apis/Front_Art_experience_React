import React, { useContext, Fragment } from 'react';
import { IBarber } from '../../../types/Barber.type';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Slider } from '../../slider/slider';
import { ContainerPage } from '../container-page/container-page';
import './barbers-card.scss';

export const BarbersCard = (props: {
    barbers: IBarber[]
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getInfoBox = (barber, theme) => {
        return (
            <div className={`info-box`}>
                <p className="title">{barber.name}</p>
                <div className="box-info">
                    <p className={`info text text-${theme}`}>{barber.barberDescription}</p>
                </div>

                <div className="employee-social">
                    <a href={barber.instagram}>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                        <FaInstagram className="employee-social-logo social-logo" />
                    </a>
                    <a href={barber.facebook}>
                        <FaFacebook className="employee-social-logo social-logo" />
                    </a>
                </div>
            </div>
        )
    }

    const getSliderBox = (barber) => {
        return (
            <div className="slider-box">
                <Slider auto={false} items={[{ url: barber.urlProfileImage }]} />
            </div>
        )
    }

    const getLeft = (barber, i) => {
        return (
            <div className="barber-card" key={i}>
                {getInfoBox(barber, getTheme())}
                <div className={`line_divider`}><div /></div>
                {getSliderBox(barber)}
            </div>
        )
    }

    const getRight = (barber, i) => {
        return (
            <div className="barber-card" key={i}>
                {getSliderBox(barber)}
                <div className="line_divider"><div /></div>
                {getInfoBox(barber, getTheme())}
            </div >
        )
    }

    return (
        <Fragment>
            {props.barbers.map((barber, i) => {
                return <ContainerPage className="container-page"
                    key={i}
                    title={barber.name}
                    info={barber.barberDescription}
                    img={barber.urlProfileImage}
                    align={i % 2 === 0 ? "left" : "right"}
                />
            })}
        </Fragment>
    )
}
