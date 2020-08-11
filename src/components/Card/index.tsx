// eslint-disable-next-line no-unused-vars
import React, { ReactChild } from 'react';
import './Card.scss';
import '../../styles/ArtExperienceFonts.scss';

export const Card = (props: {
    title: string,
    subtitle: string,
    children?: any;
    id?: string;
}) => {
    return (
        <div className="card" id={props.id}>
            <div className="anchor" id="about_us"></div>
            <p className="card_title art-title title art_experience-text-light"
            >{props.title}</p>
            <p className="card_subtitle art-text art_experience-text-light"
            >{props.subtitle}</p>
            <div className="card_items">
                {props.children}
            </div>
        </div>
    );
}