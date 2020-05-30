/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
  createContext,
  ChangeEvent,
  useState,
  ReactElement,
} from 'react';

export const FormContext = createContext({
  values: {},
  fields: { x: 'xnx' },
  onChange: (event: ChangeEvent<HTMLInputElement>) => undefined,
  setInitialValues: (initialValues: object) => undefined,
});

export const FormProvider = (props: {
  values: object;
  fields: object;
  children: ReactElement;
}) => {
  const [values, setValues] = useState(props.values || {});

  const onChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value });
    console.log(values)
  };

  const setInitialValues = (initialValues) => setValues(initialValues);

  const context = { values, onChange, setInitialValues };

  return (
    // <FormContext.Provider value={context}>
    //   {props.children}
    // </FormContext.Provider>
    <div></div>
  );
};
