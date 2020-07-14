import React from 'react';
import { Button } from '../../Button';
import './HourBox.scss';

export const HourBox = (props: {
    value: any,
    onSelectHour: any
}) => {

    const hours = ['14:00', "14:40", '15:20', '16:00', '16:40', '17:20'];

    return (
        <div className="hours-item">
            <div className="hours-box">
                {hours.map((hour, i) => {
                    return (
                        <Button
                            className={`art_experience-button_outlined hour-item ${props.value === hour ? 'selected-hour' : null}`}
                            key={i}
                            label={hour}
                            onClick={() => {
                                props.onSelectHour(hour);
                            }} />
                    )
                })}
            </div>
        </div >
    )
}