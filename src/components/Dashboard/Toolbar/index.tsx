import React from 'react';
import { LoginModal } from '../../LoginModal';
// import { ReserveModal } from '../../ReserveModal';
import { Button } from '../../Button';
import { AccountMenu } from '../../../components/AccountMenu';
import './Toolbar.scss';
import '../../../styles/ArtExperienceButtons.scss';
import '../../../styles/ArtExperienceFonts.scss';
// import { LeftMenu } from '../../LeftMenu';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <div id="start_page" />
            <div className="left-box">
                {/* <LeftMenu /> */}
                <img
                    className="logo-img"
                    src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                {/* <Button
                    className="art_experience-button_only-text toolbar-btn"
                    label="Reservas" /> */}
            </div>
            <div className="right-box">
                <LoginModal />
            </div>
        </div>
    );
}
