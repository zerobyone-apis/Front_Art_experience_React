// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment } from 'react';
import { Button } from '../Button';
import './DialogModal.scss';

export const DialogModal = (props: {
  title?: string,
  header?: any,
  content?: any,
  footer?: any,
  buttonLabel?: string,
  buttonClassName?: string
}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Fragment>
      <div className="dialog_activator-box" onClick={() => { setShowMenu(!showMenu) }}>
        <Button className={`dialog_activator-btn ${props.buttonClassName}`} label={props.buttonLabel} />
      </div>
      <div className="dialog-box" style={{ visibility: (showMenu ? "visible" : "hidden") }}>
        <div className="dialog-modal">
          <div className="header">
            <div className="header-title">
              {props.header ||
                (
                  <p className="title">Reservacion</p>
                )}
            </div>
          </div>
          <div className="content">
            {props.content}
          </div>
          <div className="footer">
            {props.footer}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
