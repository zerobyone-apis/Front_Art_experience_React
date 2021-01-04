import React, { useContext, useEffect, useState } from 'react';
import ReserveActions from '../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../contexts/ButtonsContext';
import { CustomTable } from '../../../custom-table/custom-table';
import { headerMobileOrder, headerOrder } from '../../../../data/dashboard';
import { IReserve } from '../../../../types/Reserve.type';
import { ManagerDialog } from './manager-dialog';
import { ManagerActions } from './manager-actions';
import { ConfirmDialog } from '../../../dialogs/confirm-dialog';
import moment from "moment";
import './reserve-manager.scss';


export const ReserveManager = () => {

    const reserveActions: ReserveActions = new ReserveActions();
    const [reserves, setReserves] = useState([]);
    const [selectedReserve, setSelectedReserve] = useState(undefined);
    const [showManagerDialog, setShowManagerDialog] = useState(false);
    const [showFinalizeDialog, setFinalizeDialog] = useState(false);
    const [showCancelDialog, setCancelDialog] = useState(false);
    const [reserveUpdated, setReserveUpdated] = useState(false);

    useEffect(() => {
        const fetchGetReserves = async () => {
            await getReserves();
            reserveUpdated ? setReserveUpdated(false) : null;
        };
        /* check user is admin
            // !userIsAdmin() ? (document.location.href = "/") : (
        */
        fetchGetReserves()
    }, [reserveUpdated])

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

    const removeSelectedReserve = () => {
        let removeReserve = reserves.splice(reserves.indexOf(selectedReserve), 1);
        setReserves(removeReserve);
        setSelectedReserve(null)
    }

    /* FINALIZE RESERVE */
    const finalize = async () => {
        setDisabledButton(true);
        let response = await reserveActions.doneReserve(
            selectedReserve.barberOrHairdresserId,
            selectedReserve.reserveId
        );
        if (response) {
            removeSelectedReserve();
            setFinalizeDialog(false);
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
            removeSelectedReserve();
            setCancelDialog(false);
        } else {
            console.log('error cancel :', response);
        }
        setDisabledButton(false);
    }
    
    /* REFRESH TABLE METHOD */
    const isUpdated = () => {
        console.log('Is updated.. 😎')
        setReserveUpdated(true);
    }

    // Este metodo es para probar y no repetir el codigo de la tabla, se que se puede hacer el render condicional de mejor forma
    // Pero de una u otra manera no me estuvo funcando bro.
    const showTable = () => {
        return (
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
        )
    }

    return (
        <>
           { /** Rancio pero la movida era para que funque, una vez de con que es lo que no deja hacer el render lo aprolijo. */
                reserveUpdated ? (
                    showTable()
                ) : (
                    showTable()
                )
           } 
            {
                selectedReserve && (
                    <ManagerActions
                        header={headerOrder[0]} //! TODO: -> Estamos quemando el valor de ordenamiento que le indicamos? (1 - fecha, 2 - ID )
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
                        onSaveRefresh={() => isUpdated()}
                        
                        //* Deprecated..
                        //? onFinalized={() => { }}
                        //? onUpdated={() => { }}
                        //? onCancelled={() => { }}
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
