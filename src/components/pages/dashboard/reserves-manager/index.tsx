import React, { useContext, useEffect, useState } from 'react';
import ReserveActions from '../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../contexts/ButtonsContext';
import { CustomTable } from '../../../custom-table/custom-table';
import { headerOrder } from '../../../../data/dashboard';
import { IReserve } from '../../../../types/Reserve.type';
import { ManagerDialog } from './manager-dialog';
import { Card } from '../../../containers/card';
import moment from "moment";


export const ReserveManager = () => {
    const [reserves, setReserve] = useState([]);
    const [selectedReserve, setSelectedReserve] = useState(undefined);
    const [showReserveDialog, setShowReserveDialog] = useState(false);


    const reserveActions: ReserveActions = new ReserveActions();
    const mobileHeaders = [headerOrder[1], headerOrder[2], headerOrder[3]];


    const {
        // @ts-ignore
        disabled,
        setDisabledButton,
    } = useContext(ButtonContext);


    useEffect(() => {
        const fetchData = async () => {
            await getReserves();
        };
        // check user is admin
        // !userIsAdmin() ? (document.location.href = "/") : (
        false ? (document.location.href = "/") : (
            // get reserves
            fetchData()
        );
    }, []);


    const getReserves = async () => {
        setDisabledButton(true);
        const reserves: any[] = await reserveActions.getAll();
        setDisabledButton(false);
        if (reserves) {
            // formatting date
            reserves.map((reserve: IReserve) => {
                reserve.startTimeFront = moment(reserve.startTime)
                    .format("DD/MM/YYYY hh:mm:ss")
                    .substr(0, 16);
            });
            setReserve(reserves);
        }
    };


    const showSelectedReserve = (reserve: any) => {
        setSelectedReserve(reserve);
        setShowReserveDialog(true);
    };


    return (
        <Card
            title="Administracion de Reservas"
            className="tool-card"
        >

            {reserves.length && (
                <CustomTable
                    noItemsMessage="No tiene reservas creadas"
                    noSearchMessage="No se encontraron coincidencias"
                    items={reserves}
                    headers={headerOrder}
                    mobileHeaders={mobileHeaders}
                    sortColumnByOtherHeader={{
                        headerToAction: "startTimeFront",
                        headerToSort: "reserveId",
                    }}
                    onSelectRow={showSelectedReserve}
                />
            )}

            {selectedReserve && showReserveDialog && (
                <ManagerDialog
                    reserve={selectedReserve}
                    onUpdated={async (updated) => {
                        /* Forma no recomendada pero para salir del paso */
                        setReserve([]);
                        await getReserves();
                        setShowReserveDialog(false);
                    }}
                    onClose={setShowReserveDialog}
                />
            )}

        </Card>
    )
}