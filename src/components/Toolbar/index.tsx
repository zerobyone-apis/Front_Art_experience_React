import React from 'react';
import { AccountMenu } from '../AccountMenu';
import { ReservationModal } from '../ReservationModal';
import { Button } from '../Button';
import './Toolbar.scss';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <div id="start_page" />
            <div className="left-box">
                <p className="title">ArtExperience</p>
                <Button href="#about_us" className="toolbar-btn" label="Acerca de Nosotros" />
                <Button href="#services" className="toolbar-btn" label="Servicios" />
                <Button href="#courses" className="toolbar-btn" label="Cursos" />
                <Button href="#contact" className="toolbar-btn" label="Contacto" />
            </div>
            <div className="right-box">
                <ReservationModal className="reservationModal" />
                {/* <AccountMenu /> */}
            </div>
        </div>
    );
}
