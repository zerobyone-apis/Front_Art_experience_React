import React, { useState, useEffect, useContext } from "react";
import { CustomTable } from "../components/dashboard/custom-table/custom-table";
import { ButtonContext } from "../contexts/ButtonsContext";
import { ReserveDialog } from "../components/dashboard/reserve-dialog/reserve-dialog";
import { Toolbar } from "../components/dashboard/toolbar/toolbar";
import { LoaderPage } from "../components/loader-page/loader-page";
import { IReserve } from "../types/Reserve.type";
import { UserContext } from "../contexts/UserContext";
import { headerOrder } from '../data/dashboard';
import ReserveActions from "../actions/Reserve.actions";
import moment from "moment";
import "./Dashboard.scss";
import "../styles/theme.scss";

const DashboardPage = () => {
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
  const {
    // @ts-ignore
    userIsAdmin,
  } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      await getReserves();
    };
    // check user is admin
    !userIsAdmin() ? (document.location.href = "/") : (
      // false ? (document.location.href = "/") : (
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
              sortColumnByOtherHeader={{
                headerToAction: "startTimeFront",
                headerToSort: "reserveId",
              }}
              onSelectRow={showSelectedReserve}
            />
          ) : null}
        </div>
      </div>
      <LoaderPage show={disabled} />
      {selectedReserve && showReserveDialog ? (
        <ReserveDialog
          reserve={selectedReserve}
          onUpdated={async (updated) => {
            /* Forma no recomendada pero para salir del paso */
            setReserve([]);
            await getReserves();
            setShowReserveDialog(false);
          }}
          onClose={setShowReserveDialog}
        />
      ) : null}
    </div>
  );
};

DashboardPage.displayName = "Dashboard Page";
export default DashboardPage;
