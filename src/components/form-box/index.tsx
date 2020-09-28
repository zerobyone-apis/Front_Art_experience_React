import React, { Component, Fragment, ReactElement, useEffect, useState } from 'react';
import {
    Textbox,
    Textarea,
    Radiobox,
    Checkbox,
    Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { StepperFooter } from '../reserve-modal/stepper-footer';

export interface IField {
    id: string,
    name: string,
    defaultValue: string,
    type: string,
    disabled: boolean,
    placeholder: string,
    tagName: 'Textbox' | 'Textarea' | 'Radiobox' | 'Checkbox' | 'Select',
    required: boolean,
    errorMsg: string
}

export const FormBox = (props: {
    children?: ReactElement | ReactElement[],
    fields: IField[],
    //StepperFooter props
    submitLabel: string,
    prevButtonLabel: string,
    onSubmit: any,
    onPrevButtonClick: any
}) => {

    const defaultFieldConfig = {}

    const [validate, setValidate] = useState(false);
    // const [fields, setFields] = useState(props.fields);

    // for test
    const [hasNameError, setHasNameError] = useState();
    const [name, setName] = useState("");

    const submit = () => {
        if (validateForm()) {
            props.onSubmit()
        }
    }

    const validateForm = () => {
        setValidate(true);
        if (!hasNameError) {
            return false;
        } else {
            return false;
        }
    }

    return (
        <form onSubmit={validateForm}>
            {props.fields.map((field, i) => getComponent(field))}
            <StepperFooter
                nextButtonLabel={props.submitLabel}
                prevButtonLabel={props.prevButtonLabel}
                onNextButtonClick={() => submit()}
                onPrevButtonClick={props.onPrevButtonClick}
            />
        </form>
    );
}


export const getComponent = (field: IField) => {
    switch (field.tagName) {
        case 'Textbox':
            return <Textbox
                attributesWrapper={{}}
                attributesInput={{
                    id: field.id,
                    name: field.name,
                    type: field.type,
                    placeholder: field.placeholder
                }}
                value={field.defaultValue} // Optional.[String].Default: "".
                disabled={field.disabled} // Optional.[Bool].Default: false.
                // validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                validationCallback={res => {
                    // setHasNameError(res);
                    // setValidate(false);
                }
                } // Optional.[Func].Default: none. Return the validation result.
                classNameInput="" // Optional.[String].Default: "".
                classNameWrapper="" // Optional.[String].Default: "".
                classNameContainer="" // Optional.[String].Default: "".
                customStyleInput={{}} // Optional.[Object].Default: {}.
                customStyleWrapper={{}} // Optional.[Object].Default: {}.
                customStyleContainer={{}} // Optional.[Object].Default: {}.
                onChange={(name, e) => {
                    // setName(name);
                    // console.log(e);
                }} // Required.[Func].Default: () => {}. Will return the value.
                onBlur={e => {
                    console.log(e);
                }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                    name: field.name, // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                    check: field.required, // Optional.[Bool].Default: true. To determin if you need to validate.
                    required: field.required, // Optional.[Bool].Default: true. To determin if it is a required field.
                    msgOnError: field.errorMsg,
                }}
            />
            break;
        case 'Textarea':
            break;
        case 'Radiobox':
            break;
        case 'Checkbox':
            break;
        case 'Select':
            break;
        default:
            break;
    }
}

