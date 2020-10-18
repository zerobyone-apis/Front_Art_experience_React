/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    ReactElement,
    createContext,
    useEffect,
    useState,
} from 'react';

export const FormContext = createContext({
    getFields: () => undefined,
    setField: (name, type, error, value, equalField) => undefined,
    validateFields: () => undefined,
    validationIsActive: () => undefined,
    setValidationFlag: (value) => undefined,
    getErrorByField: (fieldName) => undefined
});

export const FormProvider = (props: {
    children: ReactElement;
}) => {

    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [flagValidation, setFlagValidation] = useState(true);

    const getFields = () => {
        return fields;
    }

    const validationIsActive = () => {
        return flagValidation;
    }

    const setValidationFlag = (value: boolean) => {
        setFlagValidation(value)
    }

    const setField = (name: string, type: string, error: string, value: any, equalField: string) => {
        let fieldsCopy = fields;
        Object.assign(fieldsCopy, {
            [name]: {
                value: value, type: type, error: error, equalField: equalField
            }
        });
        setFields(fieldsCopy);
    }

    const getErrorByField = (fieldName: string) => {
        return errors[fieldName];
    }

    const validateFields = () => {
        let success: boolean = true;
        setErrors({});
        let errorsCopy = {};
        let fieldsCopy = fields;
        Object.assign(fieldsCopy, fields)
        Object.keys(fieldsCopy).map(fieldName => {
            if (!fieldsCopy[fieldName].value) {
                success = false;
                Object.assign(errorsCopy, { [fieldName]: 'El campo es requerido' })
            } else {
                let fieldValue = fieldsCopy[fieldName].value;
                switch (fieldsCopy[fieldName].type) {
                    case 'string':
                        if (!/^[A-Za-z\s]+$/.test(fieldValue)) {
                            Object.assign(errorsCopy, { [fieldName]: 'Debe ingresar solo letras' })
                            success = false;
                        }
                        break;
                    case 'password':
                        // its ok
                        break;
                    case 'email':
                        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue)) {
                            Object.assign(errorsCopy, { [fieldName]: 'El email no es correco' })
                            success = false;
                        }
                        break;
                    case 'number':
                        if (!/^[0-9]+$/.test(fieldValue)) {
                            Object.assign(errorsCopy, { [fieldName]: 'Debe ingresar solo numeros' })
                            success = false;
                        }
                        break;
                }
                // check equal field
                let equalField = fieldsCopy[fieldName].equalField;
                if (equalField) {
                    if (fields[fieldName].value !== fields[equalField].value) {
                        Object.assign(errorsCopy, { [fieldName]: 'Los campos no coinciden' })
                        Object.assign(errorsCopy, { [equalField]: 'Los campos no coinciden' })
                        success = false;
                    }
                }
            }
        })
        setErrors(errorsCopy);
        return success;
    }

    const context = {
        getFields,
        setField,
        getErrorByField,
        validationIsActive,
        validateFields,
        setValidationFlag
    };

    return (
        <FormContext.Provider value={context}>
            {props.children}
        </FormContext.Provider>
    );
};