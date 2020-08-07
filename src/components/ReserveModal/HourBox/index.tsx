import React, { useState, useEffect } from 'react';
import { Button } from '../../Button';
import moment from 'moment';
import AvailableTimeActions from '../../../actions/AvailableTime.actions';
import './HourBox.scss';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export const HourBox = (props: {
    value: any,
    hours: string[],
    onSelectHour: any
}) => {
    // const timeActions: AvailableTimeActions = new AvailableTimeActions();
    const [hours, setHours] = useState([])
    // const [availableHours, setAvailableHours] = useState([])

    useEffect(() => {
        setHours(props.hours)
    }, [props.hours])

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