// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
// import { Button } from '../Button';
import { Button } from '@material-ui/core';
import './ReservationModal.scss';

export const USER_ACTIONS = {
  ACCEPTED: 'accepted',
  CANCELLED: 'cancelled',
  NONE: 'none'
}

export const ReservationModal = () => {

  let data_test = [
    { id: 1, name: 'Fest X', date: '12/12/20 12:00', userAction: USER_ACTIONS.ACCEPTED },
    { id: 2, name: 'Evento de fin de anio', date: '10/05/21 15:00', userAction: USER_ACTIONS.CANCELLED },
    { id: 3, name: 'Evento Party 23', date: '12/12/20 12:00', userAction: USER_ACTIONS.NONE },
    { id: 4, name: 'Festival de cine London', date: '15/01/21 12:00', userAction: USER_ACTIONS.NONE }
  ];

  const [notifications, setNotifications] = useState(data_test);
  const [showMenu, setShowMenu] = useState(false);
  const [cancelEventMode, setCancelEventMode] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState({});

  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, setShowMenu);

  const acceptEvent = (event) => {
    let copyNotifications = notifications;
    copyNotifications.map(item => {
      if (item === event) {
        item.userAction = USER_ACTIONS.ACCEPTED;
      }
    });
    setNotifications([...copyNotifications]);
  }

  const discardEvent = (event) => {
    let copyNotifications = notifications;
    copyNotifications.map(item => {
      if (item === event) {
        item.userAction = USER_ACTIONS.CANCELLED;
      }
    });
    setNotifications([...copyNotifications]);
    setCancelEventMode(false);
  }

  const getNotificationsAvailable = () => {
    return notifications.filter(item => {
      return item.userAction === USER_ACTIONS.NONE
    }).length
  }

  return (
    <Fragment>
      <div className="notification-btn" onClick={() => { setShowMenu(!showMenu) }}>
        <Button
          className="btn-reservation"
          color="primary"
          variant="contained"
          size="large"
        >
          Reservar
        </Button>

      </div>

      <div className="notifications-menu" ref={wrapperRef} style={{ visibility: (showMenu ? "visible" : "hidden") }}>
        <p>hola</p>
      </div>
    </Fragment>
  );
}