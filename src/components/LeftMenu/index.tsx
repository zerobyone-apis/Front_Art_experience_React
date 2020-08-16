import React, { useState } from 'react'
import { Button } from '../Button';
import { FiMenu } from 'react-icons/fi'
import { DialogModal } from '../DialogModal';
import { toolbarButtons } from '../../utils/toolbarButtons';
import './LeftMenu.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/Effects.scss';

export const LeftMenu = () => {
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className="left_menu">
            <Button
                className="art_experience-button_only-text activator_btn"
                icon={<FiMenu className="art_experience-icon icon_button" />}
                onClick={() => { setShowDialog(true) }} />
            {
                !showDialog ? null : (
                    <DialogModal
                        onClose={() => { setShowDialog(false) }}
                        className="left_menu-dialog"
                        header={
                            <a href="#banner">
                                <img
                                    className="logo-img effect-opacity"
                                    src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                            </a>
                        }
                    >
                        {
                            toolbarButtons.map((button, i) => {
                                return (
                                    <Button
                                        key={i}
                                        href={button.href}
                                        onClick={() => { setShowDialog(false) }}
                                        className="art_experience-button_only-text left_menu-btn"
                                        label={button.label} />
                                )
                            })
                        }
                    </DialogModal>
                )
            }
        </div>












        // <div className="left_menu">
        //     <Button
        //         className="art_experience-button_outlined activator_btn"
        //         onClick={() => { setShowDialog(true) }}>
        //         <FiMenu className="art_experience-icon icon_button" />
        //     </Button>
        //     {
        //         !showDialog ? null : (
        //             <DialogModal
        //                 onClose={() => { setShowDialog(false) }}
        //                 className="left_menu-dialog">
        //             </DialogModal>
        //         )
        //     }
        // </div>
    );
}

{/* <p>Hola xd</p>

{

    toolbarButtons.forEach((button, i) => {
        return <Button
            key={i}
            href={button.href}
            onClick={() => { setShowDialog(false) }}
            className="art_experience-button left_menu-btn"
            label={button.label} />
    })
} */}
