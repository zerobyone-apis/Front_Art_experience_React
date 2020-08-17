// eslint-disable-next-line no-unused-vars
import React, { ReactChild, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Card.scss';
import '../../styles/ArtExperienceFonts.scss';
import '../../styles/theme.scss';

export const Card = (props: {
    title: string,
    subtitle: string,
    children?: any,
    id?: string,
    theme?: 'dark' | 'light'
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    return (
        <div className={`card ${props.theme ? props.theme : getTheme()}`} id={props.id}>
            <div className="anchor" id="about_us"></div>
            <p className={`text-${props.theme ? props.theme : getTheme()} card_title art-title title`}
            >{props.title}</p>
            <p className={`card_subtitle art-text text-${props.theme ? props.theme : getTheme()}`}
            >{props.subtitle}</p>
            <div className="card_items">
                {props.children}
            </div>
        </div>
    );
}