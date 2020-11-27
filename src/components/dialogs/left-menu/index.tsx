import React, { useState } from 'react';
import { Button } from '../../inputs/button';
import { FiMenu } from 'react-icons/fi';
import { DialogModal } from '../dialog-modal/dialog-modal';
import { toolbarButtons } from '../../../utils/toolbarButtons';
import './left-menu.scss';


export const LeftMenu = () => {

  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="left-menu">

      {/* BUTTON ACTIVATOR */}
      <Button
        style="text"
        className="left-menu-activator-btn"
        icon={<FiMenu className="theme-icon icon_button" />}
        onClick={() => {
          setShowDialog(true);
        }}
      />

      {showDialog && (
        <DialogModal
          onClose={() => setShowDialog(false)}
          className="left-menu-dialog"
          fullscreen={true}
          fullscreenOnMobile={true}>

          <div className="logo">
            <img src="https://i.ibb.co/8g4h8sk/A-art-experiecnce.png" alt="" />
          </div>

          <div className="left-menu-box">
            {toolbarButtons.map((button, i) => {
              return (
                <Button
                  style="text"
                  textStyle="title"
                  key={i}
                  href={button.href}
                  onClick={() => setShowDialog(false)}
                  className="left-menu-btn"
                  label={button.label}
                />
              )
            })}
          </div>

          <div />
        </DialogModal>
      )}
    </div>
  )
}
