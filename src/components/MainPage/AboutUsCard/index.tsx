import React, { useContext } from 'react';
import { Slider } from '../../Slider';
import { ThemeContext } from '../../../contexts/ThemeContext';
import '../../../styles/theme.scss';
import './AboutUsCard.scss';
import { Card } from '../../Card';

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
        <Card className="barber-box">
            <div className={`about_us-card ${getTheme()}`}>
                <div className="info-box">
                    <p className={`title`}>{props.title}</p>
                    <p className={`text info text-${getTheme()}`}>{props.info}</p>
                </div>
                <div className="slider-box">
                    <Slider auto={false} items={props.pictures} />
                </div>
            </div>
        </Card>

    )
}