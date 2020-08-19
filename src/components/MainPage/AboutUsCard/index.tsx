import React, { useContext } from 'react';
import './AboutUsCard.scss';
import { Slider } from '../../Slider';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const AboutUsCard = (props: {
    title: string,
    info: string,
    pictures: { url: string }[]
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`about_us-card ${getTheme()}`}>
            <div className="info-box">
                <p className={`title art-title art_experience-title`}>{props.title}</p>
                <p className={`info art-text text-${getTheme()}`}>{props.info}</p>
            </div>
            <div className="slider-box">
                <Slider auto={false} items={props.pictures} />
            </div>
        </div>
    )
}