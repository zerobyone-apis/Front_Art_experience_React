// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useRef } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { Button } from '../Button';
import './AccountMenu.scss';

export const AccountMenu = () => {

  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, setShowMenu);

  return (
    <Fragment>
      <div className="user-box">
        <img onClick={() => { setShowMenu(!showMenu) }}
          className="user-icon"
          src="https://lh3.googleusercontent.com/-WMtgXup2p9s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckFuVbksvkez3bMA9T2wIluX33o_w/photo.jpg?sz=46" alt="" />
      </div>
      <div ref={wrapperRef} className="user-menu" style={{ visibility: (showMenu ? "visible" : "hidden") }}>
        <p className="item-text user-name">Damian Rodriguez</p>
        <p className="item-text user-email">damianezetiel1@gmail.com</p>
        <hr style={{ borderColor: '#FFFFFF' }} />
        <Button
          label="Cerrar Seion"
          color='white'
          className="item-list_btn"
          onClick={() => { document.location.href = 'index' }}
        />
      </div>
    </Fragment>
  );
}