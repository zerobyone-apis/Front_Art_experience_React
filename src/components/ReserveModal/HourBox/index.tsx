import './HourBox.scss';

import React, { useEffect, useState } from 'react';

import { Button } from '../../Button';

export const HourBox = (props: {
    value: any,
    hours: string[],
    onSelectHour: any
}) => {
    const [selectedHour, setSelectedHour] = useState(props.value)
    const [hours, setHours] = useState([])

    useEffect(() => {
        setHours(props.hours)
    }, [props.hours])

    const isHourSelected = (hour: string) => {
        setSelectedHour(hour)
        props.onSelectHour(hour);
    }

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
                                // props.onSelectHour(hour);
                                isHourSelected(hour)
                            }} />
                    )
                })}
            </div>
        </div >
    )
}