import React, { useContext } from 'react';
import { Button } from '../../button/button';
import './stepper-footer.scss';
import '../../../styles/theme-buttons.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';

export const StepperFooter = (props: {
    wizard?: number,
    checkStepByWizard?: any,
    totalSteps?: number,
    nextButtonLabel?: string,
    prevButtonLabel?: string,
    nextButtonStyle?: string,
    prevButtonStyle?: string,
    onNextButtonClick: () => void,
    onPrevButtonClick: () => void,
}) => {

    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const PrevButton = () => {
        return <Button
            className={`${props.prevButtonStyle ? props.prevButtonStyle : 'theme-button-outlined'} footer-button`}
            label={props.prevButtonLabel || 'back'}
            onClick={() => props.onPrevButtonClick()}
        />
    }

    const NextButton = () => {
        return <Button
            className={`${props.nextButtonStyle ? props.nextButtonStyle : 'theme-button'} footer-button confirm`}
            label={props.nextButtonLabel || 'finalize'}
            onClick={() => props.onNextButtonClick()}
        />
    }

    return <div className={`footer ${getTheme()}`}>
        <div className="footer_right-box">
            {props.checkStepByWizard ?
                (props.wizard ? PrevButton() : null) :
                PrevButton()}

            {props.checkStepByWizard ?
                (props.checkStepByWizard() ? NextButton() : null) :
                NextButton()}
        </div>
    </div>
}
