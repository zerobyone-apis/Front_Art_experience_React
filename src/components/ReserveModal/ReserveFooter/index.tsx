import React from 'react';
import { Button } from '../../Button';
import './ReserveFooter.scss';

export const ReserveFooter = (props: {
    wizard: number,
    onChangeWizard: any,
    checkStep: any,
    finalize: any
}) => {
    return <div className="footer">
        <div className="footer_right-box">
            {
                props.wizard ? (
                    <Button
                        className="footer-button"
                        label="Volver"
                        onClick={() => {
                            props.onChangeWizard(props.wizard - 1);
                        }}
                    />
                ) : null
            }
            {
                !props.checkStep() ? null : (
                    <Button
                        className="art_experience-button footer-button confirm"
                        label={props.wizard < 4 ? 'Siguiente' : 'Reservar'}
                        onClick={() => {
                            if (props.wizard < 4) {
                                props.onChangeWizard(props.wizard + 1);
                            } else {
                                props.finalize();
                            }
                        }}
                    />
                )
            }
        </div>
    </div>
}
