// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent, useState, useEffect } from 'react';
import './TextField.scss';

export const TextField = (props: {
  name: string;
  type?: string;
  label?: string;
  error?: string;
  value?: any;
  result?: string;
  required?: boolean;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {

  const [error, setError] = useState(props.error);

  useEffect(() => {
    setError(props.error);
  }, [props.error])

  return (
    <div className={`${props.className} text-field`}>
      <label>{props.label}</label>
      <input
        autoFocus
        defaultValue={props.value}
        id={props.name}
        type={props.type}
        required={props.required}
        name={props.name}
        onChange={
          props.onChange
        }
      />
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
