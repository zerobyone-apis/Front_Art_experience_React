import React from 'react';
import './AboutUsCard.scss';
import { Slider } from '../../Slider';

export const AboutUsCard = (props: {
    title: string,
    info: string,
    pictures: { url: string }[]
}) => {
    return (
        <div className="about_us-card">
            <div className="info-box">
                <p className="title art_experience-title art-title">{props.title}</p>
                <p className="info art_experience-text-light art-text">{props.info}</p>
            </div>
            <div className="slider-box">
                <Slider auto={false} items={props.pictures} />
            </div>
        </div>
    )
}