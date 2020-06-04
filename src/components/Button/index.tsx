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
    <div className='button-holder'>
      <button
        className={`${props.className}`}
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
