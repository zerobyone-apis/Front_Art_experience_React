import React from 'react';
import { Button } from '../../Button';
import './HourBox.scss';

export const HourBox = (props: {
    value: any,
    onSelectHour: any
}) => {

    const hours = ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];

    return (
        <div className="hours-item">
            <div className="hours-box">
                {hours.map((hour, i) => {
                    return (
                        <Button
                            className={`hour-item ${props.value === hour ? 'selected-hour' : null}`}
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