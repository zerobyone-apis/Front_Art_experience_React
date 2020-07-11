// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { Button } from '../Button';
import './DialogModal.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';
import { AiOutlineClose } from 'react-icons/ai';

export const DialogModal = (props: {
  title?: string,
  header?: any,
  children?: any,
  width?: string,
  height?: string,
  onClose: () => void;
  showModal?: boolean,
  className?: string,
  buttonClassName?: string
}) => {
  return (
    <div>
      <div className={`dialog-box ${props.className}`}>
        <div className="dialog-modal" style={{ height: props.height, width: props.width }}>
          <div className="header">
            <div className="close_btn-box">
              <div className="art_experience-button_only-text">
                <Button className="close_btn" onClick={() => { props.onClose() }}>
                  <AiOutlineClose
                    className="art_experience-icon" />
                </Button>
              </div>
            </div>
            {
              !props.title ? null :
                <div className="header-title">
                  {props.header ||
                    (
                      <p className="title art_experience-text-light">{props.title}</p>
                    )}
                </div>
            }
          </div>
          <div className="content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
