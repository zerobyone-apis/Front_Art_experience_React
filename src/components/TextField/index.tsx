// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent, useState, useEffect } from 'react';
import './TextField.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons'

export const TextField = (props: {
  name: string;
  type?: string;
  label?: string;
  error?: string;
  defaultValue?: string;
  value?: any;
  result?: string;
  icon?: string;
  iconColor?: string;
  required?: boolean;
  className?: string;
  onChange?: (name: string, value: string) => void;
}) => {

  const [error, setError] = useState(props.error);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [])

  useEffect(() => {
    setError(props.error);
  }, [props.error])

  useEffect(() => {
    props.onChange(props.name, value);
  }, [value]);

  const changeValue = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  }

  return (
    <div className={`${props.className || ''} text-field`}>
      <label className="label">{props.label}</label>
      <div className="input-box">
        <input
          autoFocus
          defaultValue={props.value}
          id={props.name}
          type={props.type}
          required={props.required}
          name={props.name}
          value={value}
          onChange={
            changeValue
          }
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
      <ErrorLabel value={error} />
    </div>
  );
};

const ErrorLabel = (props: {
  value: string;
}) => {
  if (props.value) {
    return <label className="error-label">{props.value}</label>;
  } else {
    return null;
  }
};

TextField.displayName = 'Text Field';
