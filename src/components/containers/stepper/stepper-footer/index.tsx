import React, { useContext } from 'react';
import { Button } from '../../../inputs/button';
import { FormContext } from '../../../../contexts/FormContext';
import './stepper-footer.scss';
import './stepper-footer-mobile.scss';

export const StepperFooter = (props: {
  wizard?: number
  checkStepByWizard?: (wizard: number) => boolean
  totalSteps?: number
  children?: any

  nextLabel?: string
  prevLabel?: string
  updateButtonLabel?: string

  nextIcon?: any
  prevIcon?: any

  nextButtonStyle?: 'text' | 'normal' | 'outlined'
  prevButtonStyle?: 'text' | 'normal' | 'outlined'
  updateButtonStyle?: 'text' | 'normal' | 'outlined'

  typeNextButton?: 'button' | 'submit' | 'reset'

  className?: string
  hidePrevButton?: boolean
  noUseWizard?: boolean

  // implements validation form
  validate?: boolean

  onNextButtonClick: (fields?) => void;
  onPrevButtonClick: () => void;
  onUpdateButtonClick?: () => void;
}) => {

  const {
    validateFields,
    getFields
  } = useContext(FormContext);

  const PrevButton = () => {
    return (
      <Button
        className="footer-button"
        icon={props.prevIcon}
        style={props.prevButtonStyle || 'outlined'}
        label={props.prevLabel || 'back'}
        onClick={() => props.onPrevButtonClick()}
      />
    );
  };

  const NextButton = () => {
    return (
      <Button
        icon={props.nextIcon}
        type={props.typeNextButton}
        style={props.nextButtonStyle}
        className="footer-button confirm"
        label={props.nextLabel || 'next'}
        onClick={() => {
          props.validate ? (validateFields() && props.onNextButtonClick(getFields())) : (props.onNextButtonClick())
        }}
      />
    );
  };

  return (
    <div className={`footer ${props.className}`}>
      <div className="footer_right-box">

        {props.children}

        {/* SHOW PREV BUTTON */}
        {
          !props.noUseWizard ?
            (props.hidePrevButton && ((props.wizard - 1) > -1) && PrevButton())
            : PrevButton()
        }

        {/* SHOW NEXT BUTTON */}
        {
          !props.noUseWizard ?
            (
              props.checkStepByWizard &&
              props.checkStepByWizard(props.wizard)
              && NextButton()
            )
            : NextButton()
        }
      </div>
    </div>
  )
}
