import React from 'react';
import { Button } from '../../button/button';
import './reserve-footer.scss';
import '../../../styles/ArtExperienceButtons.scss';

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
                        className="art_experience-button_outlined footer-button"
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
                        className="art_experience-button_outlined footer-button confirm"
                        label={props.wizard < 3 ? 'Siguiente' : 'Reservar'}
                        onClick={() => {
                            if (props.wizard < 3) {
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
