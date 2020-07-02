// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect } from 'react';
import { Button } from '../Button';
import './DialogModal.scss';
import '../../styles/ArtExperienceButtons.scss';
import { AiOutlineClose } from 'react-icons/ai';

export const DialogModal = (props: {
  title?: string,
  header?: any,
  children?: any,
  width?: string,
  onClose: () => void;
  showModal?: boolean,
  className?: string,
  buttonClassName?: string
}) => {
  return (
    <div>
      <div className={`dialog-box ${props.className}`}>
        <div className="dialog-modal">
          <div className="header">
            <div className="header-title">
              {props.header ||
                (
                  <p className="title">{props.title}</p>
                )}
            </div>
            <div className="close-box">
              <AiOutlineClose onClick={() => {
                { props.onClose() }
              }} className="art_experience-icon close-btn" />
            </div>
          </div>
          <div className="content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
