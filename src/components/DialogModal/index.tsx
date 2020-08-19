// eslint-disable-next-line no-unused-vars
import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Button } from '../Button';
import './DialogModal.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';
// import '../../styles/Effects.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { ThemeContext } from '../../contexts/ThemeContext';

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
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  // style={{ height: `${props.height}`, width: `${props.width}` }
  return (
    <div className={`dialog-box effect-opacity ${props.className}`}>
      <div className={`dialog-modal effect-opacity ${getTheme()}`}>
        <div className="header">
          <div className="close_btn-box">
            <div className="art_experience-button_only-text">
              {!props.hideCloseButton ? (
                <Button className="close_btn"
                  icon={<AiOutlineClose
                    className="art_experience-icon" />}
                  onClick={() => { props.onClose() }} />
              ) : null}
            </div>
          </div>
          <div className="header-title">
            {props.header || <p className="art_experience-text-light art-title title">{props.title}</p>}
          </div>
        </div>
        <div className={`content ${getTheme}`}>
          {props.children}
        </div>
      </div>
    </div >
  );
}
