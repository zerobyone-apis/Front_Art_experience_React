import { useContext, useEffect } from 'react';
import { FormContext } from '../contexts/FormContext';
export const useFormClear = (initialState: object): boolean => {
  const { values, setInitialValues } = useContext(FormContext);
  useEffect(() => {
    setInitialValues(initialState);
  }, []);
  if (values === initialState) return true;
  return false;
};
