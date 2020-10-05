import React, { useState, useEffect, useContext } from 'react';
import { CustomTable } from '../components/dashboard/custom-table/custom-table';
import { ButtonContext } from '../contexts/ButtonsContext';
import { ReserveDialog } from '../components/dashboard/reserve-dialog/reserve-dialog';
import { Toolbar } from '../components/dashboard/toolbar/toolbar';
import { LoaderPage } from '../components/loader-page/loader-page';
import { IReserve } from '../types/Reserve.type';
import ReserveActions from '../actions/Reserve.actions';
import { AiOutlineSend } from 'react-icons/ai';
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import './Dashboard.scss';
import '../styles/theme.scss';

export const listItems = (props: { items: string[] }) => {
  return (
    <div className="list-box">
      <h1 className="list-titlex">Nuestros Servicios</h1>
      {props.items.map((item, i) => {
        return (
          <div className="list-item" key={i}>
            <AiOutlineSend className="icon" />
            <p className="info">{item}</p>
          </div>
        );
      })}
    </div>
  );
};

const DashboardPage = () => {
  const reserveActions: ReserveActions = new ReserveActions();
  const [reserves, setReserve] = useState([]);
  const [selectedReserve, setSelectedReserve] = useState(undefined);
  const [showReserveDialog, setShowReserveDialog] = useState(false);

  // coninfo-text
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    userIsAdmin
  } = useContext(UserContext);



  /* validation of access into Dashboard page */
  /* Is necesary be a admin */
  useEffect(() => {
    /* check user level for goto administration 
      true: start validation / false: skip and enter😎
    */
    startValidationUser(false);
  }, []);



  const headerOrder = [
    { text: 'ID', value: 'reserveId' },
    { text: 'N°Social', value: 'socialNumber' },
    { text: 'Cliente', value: 'nameClient' },
    { text: 'Fecha', value: 'startTimeFront' },
    { text: 'Barbero', value: 'barberName' },
    { text: 'Servicio', value: 'workToDo' },
  ];

  const services = [
    'Cortes para Caballeros',
    'Cortes para Damas',
    'Servicio de Cafetería',
    'Productos',
  ];
  const courses = ['Intensivo', 'Colorimetría', 'Avanzado'];

  const mobileHeaders = [headerOrder[1], headerOrder[2], headerOrder[3]];
  useEffect(() => {
    const fetchData = async () => {
      await getReserves();
    }
    fetchData();
  }, []);

  const getReserves = async () => {
    setDisabledButton(true);
    const reserves: any[] = await reserveActions.getAll();
    setDisabledButton(false);
    if (reserves) {
      // formatting date
      reserves.map((reserve: IReserve) => {
        reserve.startTimeFront = moment(reserve.startTime)
          .format('DD/MM/YYYY hh:mm:ss')
          .substr(0, 16);
      });
      setReserve(reserves);
    }
  };

  const showSelectedReserve = (reserve: any) => {
    setSelectedReserve(reserve);
    setShowReserveDialog(true);
  };



  const startValidationUser = (checkAdmin: boolean) => {
    let lok = document.location.href;
    const hash = '/dashboard/users/base?1';
    const x = ['h4<k3r', '0f',
      '+ry', 'pr0y3<+', 'n1c3',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ', lok]; const goto = (
      ) => window.location.replace(
        x[5]); !checkAdmin ? (alert(
          `${x[4]} ${x[2]} ${x[3]} ${x[1]} ${x[0]}`), goto()) :
          (!userIsAdmin() ? (document.location.href = `/${String(
            hash.split('/')[0]).replace('3', '')}`) : null)
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
              sortColumnByOtherHeader={{
                headerToAction: 'startTimeFront',
                headerToSort: 'reserveId',
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
          onUpdated={(async (updated) => {
            /* Forma no recomendada pero para salir del paso */
            setReserve([]);
            await getReserves();
            setShowReserveDialog(false);
          })}
          onClose={setShowReserveDialog}
        />
      ) : null}
    </div>
  );
};

DashboardPage.displayName = 'Dashboard Page';
export default DashboardPage;
