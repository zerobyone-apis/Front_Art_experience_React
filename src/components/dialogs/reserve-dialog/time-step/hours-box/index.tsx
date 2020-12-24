import React, { useState, useEffect } from 'react';
import { MdEventBusy } from 'react-icons/md';
import { Text } from '../../../../decorators/text';
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
                        style={selected == hour ? 'normal' : 'outlined'}
                        key={i}
                        label={hour}
                        onClick={() => {
                            onSelectItem(hour)
                        }}
                    />
                ))}

                {!props.hours.length && (
                    <div className="no-hours-box">
                        <MdEventBusy />
                        <Text type="text" className="no-hours">
                            No hay horarios disponibles para esta fecha
                        </Text>
                    </div>
                )}

            </div>
        </div>
    )
}
