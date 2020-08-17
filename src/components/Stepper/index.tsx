import React, { Children, ReactChild, useContext } from 'react';
import './Stepper.scss';

export const Stepper = (props: {
    wizard: number,
    children: ReactChild[]
}) => {
    return (
        <div className="stepper">
            <div className="step">
                {props.children[props.wizard]}
            </div>
        </div>
    )
}
