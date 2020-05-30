import { Button } from '../Button';
import React, { useState } from 'react'
import './LeftMenu.scss';

export const LeftMenu = () => {

    const [dashboardStep, setDashboardStep] = useState(1);

    return (
        <div className="left-menu">
            <Button
                label="Nuevo Evento"
                color="white"
                className="new-event_btn"
                onClick={() => { setDashboardStep(1) }}
            />
            <Button
                label="Mis Eventos"
                color={dashboardStep == 1 ? '#E8F0FE' : 'white'}
                fontColor={dashboardStep == 1 ? '#1967D2' : ''}
                className="item-list_btn"
                onClick={() => { setDashboardStep(1) }}
            />
            <Button
                label="Participacion"
                color={dashboardStep == 2 ? '#E8F0FE' : 'white'}
                fontColor={dashboardStep == 2 ? '#1967D2' : ''}
                className="item-list_btn"
                onClick={() => { setDashboardStep(2) }}
            />
        </div>
    );
}