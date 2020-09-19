import React, { useState, useEffect, useContext } from 'react';
import { CustomTable } from '../components/dashboard/custom-table/custom-table';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ReserveDialog } from '../components/dashboard/reserve-dialog/reserve-dialog';
import { Toolbar } from '../components/dashboard/toolbar/toolbar';
import { LoaderPage } from '../components/loader-page/loader-page';
import { IReserve } from '../types/Reserve.type';
import ReserveActions from '../actions/Reserve.actions';
import {
    AiOutlineSend,
    AiFillInstagram,
    AiFillFacebook,
    AiFillPhone,
} from 'react-icons/ai';
import { GiWorld } from 'react-icons/gi'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { TiLocation } from 'react-icons/ti'

import moment from 'moment';
import './Dashboard.scss';
import '../styles/theme.scss';




export const listItems = (props: { items: string[] }) => {
    return <div className="list-box">
        <h1 className="list-titlex">Nuestros Servicios</h1>
        {
            props.items.map((item, i) => {
                return (
                    <div className="list-item" key={i}>
                        <AiOutlineSend className="icon" />
                        <p className="info">{item}</p>
                    </div>
                )
            })
        }
    </div>
}

const DashboardPage = () => {
    const reserveActions: ReserveActions = new ReserveActions();
    const [reserves, setReserve] = useState([]);
    const [selectedReserve, setSelectedReserve] = useState(undefined);
    const [showReserveDialog, setShowReserveDialog] = useState(false);

    // coninfo-text
    const {
        // @ts-ignore
        disabled,
        setDisabledButton
    } = useContext(ButtonContext);

    const headerOrder = [
        { text: 'ID', value: 'reserveId' },
        { text: 'Cliente', value: 'nameClient' },
        { text: 'Fecha', value: 'startTimeFront' },
        { text: 'Servicio', value: 'workToDo' }
    ];

    const services = [
        'Cortes para Caballeros', 'Cortes para Damas', 'Servicio de Cafetería', 'Productos'
    ]
    const courses = [
        'Intensivo', 'Colorimetría', 'Avanzado'
    ]

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
                reserve.startTimeFront = moment(reserve.startTime).format('DD/MM/YYYY hh:mm:ss').substr(0, 16);
            })
            setReserve(reserves)
        }
    }

    const showSelectedReserve = (selectedReserve: any) => {
        setSelectedReserve(selectedReserve);
        setShowReserveDialog(true);
    }


    return (
        <div className="dashboard_page">
            <Toolbar />
            <div className="page-box">
                <div className="dashboard">

                    {reserves.length ? (
                        <CustomTable
                            titlex="Lista de Reservas"
                            noItemsMessage="No tiene reservas creadas"
                            noSearchMessage="No se encontraron coincidencias"
                            items={reserves}
                            headers={headerOrder}
                            mobileHeaders={mobileHeaders}
                            sortColumnByOtherHeader={{ headerToAction: 'startTimeFront', headerToSort: 'reserveId' }}
                            onSelectRow={showSelectedReserve}
                        />
                    ) : null}
                </div>
            </div>
            <LoaderPage show={disabled} />
            {selectedReserve && showReserveDialog ? (
                <ReserveDialog
                    onClose={setShowReserveDialog}
                    reserve={selectedReserve} />
            ) : null}
        </div>
    );
}

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
