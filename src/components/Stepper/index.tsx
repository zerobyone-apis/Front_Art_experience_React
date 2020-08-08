import './Stepper.scss';

import React, { Children, ReactChild, useContext } from 'react';

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
