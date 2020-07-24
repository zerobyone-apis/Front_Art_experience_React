import React, { useState, useEffect, useContext } from 'react';
import { Table } from '../components/Dashboard/CustomTable';
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
                    <img src="https://instagram.fmvd3-1.fna.fbcdn.net/v/t51.2885-15/e35/16908004_267284700350772_2860727636823375872_n.jpg?_nc_ht=instagram.fmvd3-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Gg16hcNu30YAX-IgcF7&oh=bac572518fde54f2c7f19429ea9f9a8c&oe=5F450E0A" alt="" />
                    {/* {reserves.length ?
                        (<Table />) : null}
                    items={reserves} headers={headerOrder} */}
                </div>
            </div>
            <LoaderPage show={disabled} />
        </div>
    );
}

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
