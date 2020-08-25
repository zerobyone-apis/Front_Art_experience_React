import React from 'react';
import { LoginModal } from '../../login-modal/login-modal';
import './toolbar.scss';
import '../../../styles/effects.scss';

export const Toolbar = () => {
    return (
        <div className="toolbar effect-slide_bottom">
            <div id="start_page" />
            <div className="left-box">
                <img
                    className="logo-img effect-opacity"
                    src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
            </div>
            <div className="right-box">
                <LoginModal />
            </div>
        </div>
    );
}
