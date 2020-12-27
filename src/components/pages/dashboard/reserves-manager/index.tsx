import React, { useContext, useEffect, useState } from 'react';
import ReserveActions from '../../../../actions/Reserve.actions';
import { ButtonContext } from '../../../../contexts/ButtonsContext';
import { CustomTable } from '../../../custom-table/custom-table';
import { headerMobileOrder, headerOrder } from '../../../../data/dashboard';
import { IReserve } from '../../../../types/Reserve.type';
import moment from "moment";
import './reserve-manager.scss';


export const ReserveManager = () => {

    const [reserves, setReserves] = useState([]);

    const [selectedReserve, setSelectedReserve] = useState(undefined);
    const [showReserveDialog, setShowReserveDialog] = useState(false);
    const [showFinalizeDialog, setFinalizeDialog] = useState(false);
    const [showCancelDialog, setCancelDialog] = useState(false);

    const reserveActions: ReserveActions = new ReserveActions();

    // Mobile headers
    const mobileHeaders = headerMobileOrder;

    const {
        // @ts-ignore
        disabled,
        setDisabledButton,
    } = useContext(ButtonContext);


    useEffect(() => {
        const fetchGetReserves = async () => {
            await getReserves();
        };
        /* check user is admin
            // !userIsAdmin() ? (document.location.href = "/") : (
        */
        fetchGetReserves()
    }, [])

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
        setShowReserveDialog(true);
    }
    const showActionsReserve = (reserve: any) => {
        setSelectedReserve(reserve);
        // setShowReserveDialog(true);
    }

    return (
        <div>
            <CustomTable
                items={reserves}
                headers={headerOrder}
                onSelectRow={showActionsReserve}
                onEditItem={showEditReserve}
                sortColumnByHeader={{
                    headerToAction: "startTimeFront",
                    headerToSort: "reserveId",
                }}
                footerItems={[]}
            />
        </div>
    )
}
