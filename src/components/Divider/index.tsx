import React from 'react';
import './Divider.scss';
import { url } from 'inspector';

export const Divider = (props: {
    img: string,
    align: string,
    id?: string,
}) => {
    return (
        <div id={props.id} className="divider-box">
            <div style={{ backgroundImage: props.img }} className={`divider_${props.align}`}>
                {/* <img className="img_paralax" src={props.img} alt="" /> */}
            </div>
        </div>
    )
}