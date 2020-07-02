import { Button } from '../Button';
import React, { useState } from 'react'
import './LeftMenu.scss';
import '../../styles/ArtExperienceButtons.scss';
import { FiMenu } from 'react-icons/fi'
import { DialogModal } from '../DialogModal';
import { toolbarButtons } from '../../utils/toolbarButtons';

export const LeftMenu = (props: {
    buttonClassName?: string;
}) => {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className="left_menu">
            <FiMenu onClick={() => { setShowDialog(true) }} className="art_experience-icon menu-icon" />
            {
                !showDialog ? null : (
                    <DialogModal onClose={() => { setShowDialog(false) }} className="left_menu-dialog">
                        {
                            toolbarButtons.map((button, i) => {
                                return <Button key={i} href={button.href} onClick={() => { setShowDialog(false) }} className="art_experience-button left_menu-btn" label={button.label} />
                            })
                        }
                    </DialogModal>
                )
            }
        </div>
    );
}