import React, { useContext, useEffect, useState } from 'react';
import ReserveActions from '../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../contexts/ButtonsContext';
import { CustomTable } from '../../../custom-table/custom-table';
import { headerMobileOrder, headerOrder } from '../../../../data/dashboard';
import { IReserve } from '../../../../types/Reserve.type';
import moment from "moment";
import './reserve-manager.scss';
import { ManagerDialog } from './manager-dialog';
import { ManagerActions } from './manager-actions';
import { ConfirmDialog } from '../../../dialogs/confirm-dialog';


export const ReserveManager = () => {

    const reserveActions: ReserveActions = new ReserveActions();
    const [reserves, setReserves] = useState([]);
    const [selectedReserve, setSelectedReserve] = useState(undefined);
    const [showManagerDialog, setShowManagerDialog] = useState(false);
    const [showFinalizeDialog, setFinalizeDialog] = useState(false);
    const [showCancelDialog, setCancelDialog] = useState(false);

    useEffect(() => {
        const fetchGetReserves = async () => {
            await getReserves();
        };
        /* check user is admin
            // !userIsAdmin() ? (document.location.href = "/") : (
        */
        fetchGetReserves()
    }, [])


    // Mobile headers
    const mobileHeaders = headerMobileOrder;

    const {
        // @ts-ignore
        disabled,
        setDisabledButton,
    } = useContext(ButtonContext);

    const getReserves = async () => {
        setDisabledButton(true);
        const reserves: any[] = await reserveActions.getAll();
        if (reserves) {
            /* formatting date */
            reserves.map((reserve: IReserve) => {
                reserve.startTimeFront = moment(reserve.startTime)
                    .format("DD/MM/YYYY hh:mm:ss")
                    .substr(0, 16);
            })
            setReserves(reserves);
        }
        setDisabledButton(false);
    }

    const showEditReserve = (reserve: any) => {
        setSelectedReserve(reserve);
        setShowManagerDialog(true);
    }

    /* FINALIZE RESERVE */
    const finalize = async () => {
        setDisabledButton(true);
        let response = await reserveActions.doneReserve(
            selectedReserve.barberOrHairdresserId,
            selectedReserve.reserveId
        );
        if (response) {
            console.log('success finalize');
        } else {
            console.log('error', response);
        }
        setDisabledButton(false);
    }

    /* CANCEL RESERVE */
    const cancel = async () => {
        setDisabledButton(true);
        let response = await reserveActions.cancel(
            selectedReserve.clientId,
            selectedReserve.reserveId
        )
        if (response) {
            console.log('success cancel');
        } else {
            console.log('error cancel :', response);
        }
        setDisabledButton(false);
    }

    return (
        <>
            <CustomTable
                items={reserves}
                headers={headerOrder}
                onSelectRow={(reserve) => {
                    setSelectedReserve(reserve)
                }}
                onEditItem={(reserve) => {
                    showEditReserve(reserve)
                }}
                sortColumnByHeader={{
                    headerToAction: "startTimeFront",
                    headerToSort: "reserveId",
                }}
                footerItems={[]}
            />

            {
                selectedReserve && (
                    <ManagerActions
                        header={headerOrder[0]}
                        item={selectedReserve}
                        onFinalize={() => setFinalizeDialog(true)}
                        onCancelled={() => setCancelDialog(true)}
                    />
                )
            }

            {
                showManagerDialog && (
                    <ManagerDialog
                        reserve={selectedReserve}
                        onClose={() => setShowManagerDialog(false)}
                        onFinalized={() => { }}
                        onUpdated={() => { }}
                        onCancelled={() => { }}
                    />
                )
            }


            {showFinalizeDialog && (
                <ConfirmDialog
                    title="Finalizacion de reserva"
                    message="Esta seguro de que desea finalizar la reserva?"
                    acceptLabel="Confirmar Accion"
                    cancelLabel="Volver"
                    onAccept={() => finalize()}
                    onCancel={() => setFinalizeDialog(false)}
                />
            )}

            {showCancelDialog && (
                <ConfirmDialog
                    title="Cancelacion de reserva"
                    message="Esta seguro de que desea cancelar la reserva?"
                    acceptLabel="Confirmar Accion"
                    cancelLabel="Volver"
                    onAccept={() => cancel()}
                    onCancel={() => setCancelDialog(false)}
                />
            )}
        </>
    )
}
