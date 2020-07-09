import React from 'react';
import './BarbersList.scss';

export const BarbersList = (props: {
    value: any,
    setBarber: any,
    barbers: any[]
}) => {
    return (
        <div className="barbers-box">
            <div className="list_barbers-box">
                {
                    props.barbers.map(barber => {
                        return (
                            <div
                                className={`barber ${props.value.name === barber.name ? 'selected-barber' : null}`}
                                onClick={() => {
                                    props.setBarber(barber);
                                }}
                                key={`barber_${props.barbers.indexOf(barber)}`}
                            >
                                <img src={barber.img} className="img" />
                                <p className="barber-name">{barber.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}