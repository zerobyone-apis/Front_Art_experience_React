import React from 'react';
import { LoginModal } from '../LoginModal';
import { ReserveModal } from '../ReserveModal';
import { Button } from '../Button';
import { LeftMenu } from '../LeftMenu';
import { toolbarButtons } from '../../utils/toolbarButtons';
import './Toolbar.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';


export const Toolbar = () => {
    return (
        <div className="toolbar">
            <div id="start_page" />
            <div className="left-box">
                <LeftMenu />
                <a href="#banner">
                    <img
                        className="logo-img"
                        src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                </a>
                {
                    toolbarButtons.map((button, i) => {
                        return (
                            <Button
                                key={i}
                                href={button.href}
                                className="art_experience-button_only-text toolbar-btn"
                                label={button.label}
                            />
                        )


                    })
                }
            </div>
            <div className="right-box">
                <ReserveModal />
                <LoginModal />
            </div>
        </div>
    );
}