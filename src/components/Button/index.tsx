// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, ChangeEvent } from 'react';
import { ButtonContext } from '../../contexts/ButtonsContext';

import './Button.scss';
import '../../styles/ArtExperienceFonts.scss';
export const Button = (props: {
  label?: string;
  onClick?: any;
  width?: string;
  children?: React.ReactChild;
  color?: string;
  disabled?: boolean;
  fontColor?: string;
  className?: string;
  labelClassName?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {

  const {
    // @ts-ignore
    disabled
  } = useContext(ButtonContext);

  return (
    <div className={`${props.className} ${disabled ? 'disabled' : ''} button-holder`}>

      <button
        disabled={disabled}
        // disabled={props.disabled}
        style={{
          'width': props.width,
          background: props.color,
          color: props.fontColor
        }}
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        <a href={props.href}>
          <div>
            {props.children}

            {!props.label ? null :
              <p className={`${props.labelClassName} label_button art_experience-text-light`}
                style={{ marginLeft: (props.children ? "10px" : "0px") }}>
                {props.label}
              </p>
            }
          </div>
        </a>
      </button>
    </div>
  );
};
