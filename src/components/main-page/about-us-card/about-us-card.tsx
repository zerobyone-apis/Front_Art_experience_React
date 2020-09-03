import React, { useContext } from 'react';
import { Slider } from '../../slider/slider';
import { ThemeContext } from '../../../contexts/ThemeContext';
import '../../../styles/theme.scss';
import './about-us-card.scss';
import { Card } from '../../card/card';
import { useWindowSize } from '../../../hooks/useWindowSize';

export const AboutUsCard = (props: {
    title: string,
    info: string,
    pictures: { url: string }[]
}) => {
    const screenSize = useWindowSize();
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);
    return (
        <div className={`back-box ${getTheme()}`}>
            <div className={`container`}>
                <div className={`about-us-card`}>
                    <div className="info-box">
                        <p className={`title`}>{props.title}</p>
                        <p className={`text info text-${getTheme()}`}>{props.info}</p>
                    </div>
                    <div className="img-box">
                        <div className="image">
                            <img style={
                                (screenSize.size.width > 1100 ?
                                    ({ width: `${(screenSize.size.width - 520) / 2}px` })
                                    : null)}
                                src="https://instagram.fmvd1-1.fna.fbcdn.net/v/t51.2885-15/e35/57488298_2276560875734649_7666756016645949298_n.jpg?_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=MskQCPZA-BkAX_omsCq&oh=44ff4fcc828dcbe2403bedd48f6383e6&oe=5F57538C" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}