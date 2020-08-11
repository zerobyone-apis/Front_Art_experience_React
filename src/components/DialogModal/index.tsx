// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { Button } from '../Button';
import './DialogModal.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';
import '../../styles/Effects.scss';
import { AiOutlineClose } from 'react-icons/ai';

export const DialogModal = (props: {
  title?: string,
  header?: any,
  children?: any,
  width?: string,
  height?: string,
  onClose: () => void,
  hideCloseButton?: boolean,
  showModal?: boolean,
  className?: string,
  buttonClassName?: string
}) => {
  return (
    <div className={`dialog-box effect-opacity ${props.className}`}>
      <div className="dialog-modal effect-opacity" style={{ height: `${props.height}`, width: `${props.width}` }}>
        <div className="header">
          <div className="close_btn-box">
            <div className="art_experience-button_only-text">
              {!props.hideCloseButton ? (
                <Button className="close_btn" onClick={() => { props.onClose() }}>
                  <AiOutlineClose
                    className="art_experience-icon" />
                </Button>
              ) : null}
            </div>
          </div>
          <div className="header-title">
            {props.header || <p className="art_experience-text-light art-title title">{props.title}</p>}
          </div>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
    </div>
  );
}
