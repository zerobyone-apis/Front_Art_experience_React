import React, { useContext } from 'react';
import { IBarber } from '../../../types/Barber.type';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './BarbersCard.scss';
import { Slider } from '../../Slider';
import { Card } from '../../Card';

export const BarbersCard = (props: {
    barbers: IBarber[]
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const getInfoBox = (barber, theme) => {
        return (
            <div className={`info-box ${theme}`}>
                <p className="title art_experience-title art-title">{barber.name}</p>
                <p className={`info art-text text-${theme}`}>{barber.barberDescription}</p>
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

    const getLeft = (barber) => {
        return (
            <div className="barber-card">
                {getInfoBox(barber, 'dark')}
                <div className={`line_divider ${getTheme()}`}><div /></div>
                {getSliderBox(barber)}
            </div>
        )
    }

    const getRight = (barber) => {
        return (
            <div className="barber-card">
                {getSliderBox(barber)}
                <div className="line_divider"><div /></div>
                {getInfoBox(barber, 'dark')}
            </div >
        )
    }

    return (
        <Card theme="dark" title="Barberos" subtitle="Tenemos un personal especializado en todo tipo de trabajos, con la mejor atencion y coordialidad">
            {
                props.barbers.map((barber, i) => {
                    if (i % 2 != 0) {
                        return getLeft(barber);
                    } else {
                        return getRight(barber);
                    }
                })
            }
        </Card >
    )
}
