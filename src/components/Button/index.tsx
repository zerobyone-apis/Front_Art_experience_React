// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent } from 'react';
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
  return (
    <div className={`${props.className} button-holder`}>
      <a href={props.href}>
        <button
          disabled={props.disabled}
          className={`${props.disabled ? 'disabled' : ''}`}
          style={{
            'width': props.width,
            background: props.color,
            color: props.fontColor
          }}
          type={props.type || 'button'}
          onClick={props.onClick}
        >
          {props.children}
          {!props.label ? null :
            <p className={`${props.labelClassName} label_button art_experience-text-light`}
              style={{ marginLeft: (props.children ? "10px" : "0px") }}>
              {props.label}
            </p>}
        </button>
      </a>
    </div>
  );
};
