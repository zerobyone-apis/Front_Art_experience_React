import React from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { Step } from '../../stepper/step';
import './success-step.scss';

export const SuccessStep = () => {
    return (
        <Step
            title="Reserva realizada con exito!"
            subtitle="La reserva se realizo de forma satisfactoria"
        >
            <div className="success-box">
                {/* <FaRegCalendarCheck className="success-icon effect-slide_top" /> */}
                <div className="logo">
                    <img
                        className="logo-img"
                        src="https://i.ibb.co/8g4h8sk/A-art-experiecnce.png"
                        alt=""
                    />
                </div>
            </div>
        </Step>
    )
}