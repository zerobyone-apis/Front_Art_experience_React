// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import './TextField.scss';

export const TextField = (props: {
  value?: any;
  onChange?: (value: string, name: string | undefined) => void;
  name: string;
  type?: string;
  label?: string;
  error?: string;
  defaultValue?: string;
  result?: string;
  icon?: string;
  tabIndex?: number;
  iconColor?: string;
  required?: boolean;
  className?: string;
}) => {
  const [value, setValue] = useState(props.value || '');
  const [error, setError] = useState(props.error);

  useEffect(() => {
    setError(props.error);
  }, [props.error])

  // useEffect(() => {
  //   props.onChange(value, props.name);
  // }, [value]);

  const changeValue = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    props.onChange(value, name);
  }

  const ErrorLabel = (props: {
    value: string;
  }) => {
    if (props.value) {
      return (
        <div>
          <label className="error-label">{props.value}</label>;
        </div>
      )
    } else {
      return null;
    }
  };
  return (
    <div className={`${props.className || ''} text-field`}>
      <label className="label">{props.label}</label>
      <div className="input-box">
        <input
          tabIndex={props.tabIndex}
          name={props.name}
          type={props.type || 'string'}
          required={props.required}
          value={value}
          autoFocus
          onChange={changeValue}
        />
        {
          props.icon && !value ? (
            <FontAwesomeIcon
              color={props.iconColor || 'grey'}
              icon={Icons[props.icon]}
              className="text_field-icon" />
          ) : null
        }
      </div>
      <ErrorLabel value={props.error} />
    </div>
  );
};
