import React, { useState, useEffect, useContext } from 'react';
import { CustomTable } from '../components/Dashboard/CustomTable';
import ReserveActions from '../actions/Reserve.actions';
import { ButtonContext } from '../contexts/ButtonsContext';
import { Toolbar } from '../components/Dashboard/Toolbar';
import { LoaderPage } from '../components/LoaderPage';
import './Dashboard.scss';
import { IReserve } from '../types/Reserve.type';
import moment from 'moment';

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
        { text: 'Fecha de Reservacion', value: 'startTimeFront' },
        { text: 'Servicio', value: 'workToDo' }
    ];
    const mobileHeaders = [headerOrder[1], headerOrder[2], headerOrder[3]];

    useEffect(() => {
        getReserves();
    }, [])

    const getReserves = async () => {
        setDisabledButton(true)
        const reserves: any[] = await reserveActions.getAll();
        setDisabledButton(false)
        if (reserves) {
            // formatting date
            reserves.map((reserve: IReserve) => {
                reserve.startTimeFront = moment(reserve.startTime).format('DD/MM/YYYY hh:mm:ss');
            })
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
                            title="Lista de Reservas"
                            noItemsMessage="No tiene reservas creadas"
                            noSearchMessage="No se encontraron coincidencias"
                            items={reserves}
                            headers={headerOrder}
                            mobileHeaders={mobileHeaders}
                        />
                    ) : null}
                </div>
            </div>
            <LoaderPage show={disabled} />
        </div>
    );
}

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
