// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent } from 'react';
import './Button.scss';
export const Button = (props: {
  label: string;
  onClick?: any;
  width?: string;
  color?: string;
  fontColor?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <div className={`${props.className} button-holder`}>
      <button
        style={{
          'width': props.width,
          background: props.color,
          color: props.fontColor
        }}
        type={props.type || 'button'}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
};
