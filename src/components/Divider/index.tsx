import React, { ReactChildren, Children, ReactChild } from 'react';
import './Divider.scss';
import { url } from 'inspector';

export const Divider = (props: {
    children?: ReactChild,
    img: string,
    align: string,
    id?: string,
}) => {
    return (
        <div id={props.id} className="divider-box">
            <div className={`divider_${props.align}`}>
                <div className="back_img" style={{ backgroundImage: props.img }} />
                <div className="divider_items">
                    {props.children}
                </div>
            </div>
        </div>
    )
}