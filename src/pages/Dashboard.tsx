import React, { useState, useEffect, useContext } from 'react';
import { CustomTable } from '../components/Dashboard/CustomTable';
import ReserveActions from '../actions/Reserve.actions';
import { ButtonContext } from '../contexts/ButtonsContext';
import { Toolbar } from '../components/Dashboard/Toolbar';
import { LoaderPage } from '../components/LoaderPage';
import './Dashboard.scss';

const DashboardPage = () => {
    const reserveActions: ReserveActions = new ReserveActions();
    const [reserves, setReserve] = useState([]);
    // context
    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);

    const headerOrder = [
        { text: 'ID', value: 'reserveId' },
        { text: 'Cliente', value: 'nameClient' },
        { text: 'Fecha de Reservacion', value: 'startTime' },
        { text: 'Servicio', value: 'workToDo' },
        { text: 'Estado', value: 'status' },
    ];

    useEffect(() => {
        getReserves();
    }, [])

    const getReserves = async () => {
        setDisabledButton(true)
        const reserves = await reserveActions.getAll();
        setDisabledButton(false)
        if (reserves) {
            setReserve(reserves)
        }
    }

    return (
        <div className="dashboard_page">
            <Toolbar />
            <div className="page-box">
                <div className="dashboard">
                    {reserves.length ? (
                        <CustomTable
                            noItemsMessage="No tiene reservas creadas"
                            noSearchMessage="No se encontraron coincidencias"
                            items={reserves}
                            headers={headerOrder} />) : null}
                </div>
            </div>
            <LoaderPage show={disabled} />
        </div>
    );
}

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
