import React, { useState, useEffect } from 'react';
import CalendarX from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

export const Calendar = (props: {
    value: Date,
    onSelectDate: any
}) => {

    const [value, setValue] = useState(new Date())

    useEffect(() => {
        setValue(props.value || new Date())
    }, [props.value])

    return (
        <div className="calendar-box">
            <CalendarX
                minDate={new Date()}
                onChange={props.onSelectDate}
                value={value}
            />
        </div>
    );
}
