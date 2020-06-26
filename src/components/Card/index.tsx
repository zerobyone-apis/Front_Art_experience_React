// eslint-disable-next-line no-unused-vars
import React, { ReactChild } from 'react';
import './Card.scss';

export const Card = (props: {
    title: string,
    subtitle: string,
    children?: any;
    id?: string;
}) => {
    return (
        <div className="card" id={props.id}>
            <div className="anchor" id="about_us"></div>
            <h1
                className="card_title font-title"
            >{props.title}</h1>
            <p
                className="card_subtitle font-text"
            >{props.subtitle}</p>
            <div className="card_items">
                {props.children}
            </div>
        </div>
    );
}