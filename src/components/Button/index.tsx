// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent } from 'react';
import './Button.scss';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
export const Button = (props: {
  label: string;
  onClick?: any;
  width?: string;
  children?: React.ReactChildren;
  color?: string;
  disabled?: boolean;
  fontColor?: string;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <div className='button-holder'>
      <a href={props.href}>
        <button
          disabled={props.disabled}
          className={`${props.className} ${props.disabled ? 'disabled' : ''}`}
          style={{
            'width': props.width,
            background: props.color,
            color: props.fontColor
          }}
          type={props.type || 'button'}
          onClick={props.onClick}
        >
          {props.children}
          {props.label}
        </button>
      </a>
    </div>
  );
};
