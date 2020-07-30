import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarBox.scss';

export const CalendarBox = (props: {
    value: Date,
    onSelectDate: any
}) => {
    return (
        <div className="calendar-box">
            <Calendar
                onChange={props.onSelectDate}
                value={props.value}
            />
        </div>
    );
}
