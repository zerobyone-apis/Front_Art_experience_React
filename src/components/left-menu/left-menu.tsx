import React, { useState } from 'react'
import { Button } from '../button/button';
import { FiMenu } from 'react-icons/fi'
import { DialogModal } from '../dialog-modal/dialog-modal';
import { toolbarButtons } from '../../utils/toolbarButtons';
import './left-menu.scss';
import '../../styles/theme-buttons.scss';
import '../../styles/effects.scss';

export const LeftMenu = () => {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className="left_menu">
            <Button
                className="theme-button-text activator_btn"
                icon={<FiMenu className="theme-icon icon_button" />}
                onClick={() => { setShowDialog(true) }} />


            {
                !showDialog ? null : (
                    <DialogModal
                        onClose={() => { setShowDialog(false) }}
                        className="left_menu-dialog"
                    >
                        <div className="left-menu-box">
                            <div className="logo">
                                <img className="logo-img"
                                    src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                            </div>
                            {
                                toolbarButtons.map((button, i) => {
                                    return (
                                        <Button
                                            key={i}
                                            href={button.href}
                                            onClick={() => { setShowDialog(false) }}
                                            className="theme-button-text left_menu-btn"
                                            label={button.label} />
                                    )
                                })
                            }

                        </div>
                    </DialogModal>
                )
            }
        </div>
    )
}