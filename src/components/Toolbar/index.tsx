import './Toolbar.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';

import { Button } from '../Button';
import { LeftMenu } from '../LeftMenu';
import { LoginModal } from '../LoginModal';
import React, { useContext } from 'react';
import { ReserveModal } from '../ReserveModal';
import { toolbarButtons } from '../../utils/toolbarButtons';
import { UserContext } from '../../contexts/UserContext';

export const Toolbar = () => {
    const {
        // @ts-ignore
        userIsLogged,
        getUserData,
    } = useContext(UserContext);

    return (
        <div className="toolbar effect-slide_bottom">
            <div id="start_page" />
            <div className="left-box">
                <LeftMenu />
                <a href="#banner">
                    <img
                        className="logo-img effect-opacity"
                        src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                </a>
                {toolbarButtons.map((button, i) => {
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
                {userIsLogged() ? <ReserveModal /> : null}
                <LoginModal />
            </div>
        </div>
    );
}