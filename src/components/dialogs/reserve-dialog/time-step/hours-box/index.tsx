import React, { useState, useEffect } from 'react';
import { Button } from '../../../../inputs/button';
import './hours-box.scss';

export const HoursBox = (props: {
    hours: string[],
    onSelectItem: any
}) => {

    const [selected, setSelected] = useState(undefined)

    useEffect(() => {
        props.onSelectItem(selected)
    }, [selected])

    const onSelectItem = (hour) => {
        setSelected(hour);
    }

    return (
        <div className="hours-box">
            <div className="container">
                {props.hours.map((hour, i) => (
                    <Button
                        className={'hour-item'}
                        style={selected == hour ? 'outlined' : 'normal'}
                        key={i}
                        label={hour}
                        onClick={() => {
                            onSelectItem(hour)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}
