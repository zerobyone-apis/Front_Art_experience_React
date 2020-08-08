import React, { ReactChild } from 'react';
import './Divider.scss';

export const Divider = (props: {
    children?: ReactChild,
    img: string,
    align?: string,
    id?: string,
}) => {
    return (
        <div id={props.id} className="divider-box">
            <div className={`divider_left`}>
                <div className="back_img" style={{ backgroundImage: `url(${props.img})` }} />
                <div className="divider_items">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
