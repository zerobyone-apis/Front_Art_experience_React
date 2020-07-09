import React from 'react';
import { AccountMenu } from '../AccountMenu';
import { ReserveModal } from '../ReserveModal';
import { Button } from '../Button';
import './Toolbar.scss';
import '../../styles/ArtExperienceButtons.scss';
import '../../styles/ArtExperienceFonts.scss';
import { LeftMenu } from '../LeftMenu';
import { toolbarButtons } from '../../utils/toolbarButtons';
export const Toolbar = () => {
    return (
        <div className="toolbar">
            <div id="start_page" />
            <div className="left-box">
                <LeftMenu />
                {/* <img src={logo} alt="" /> */}
                <img className="logo-img" src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                {/* <Button
                    href="#"
                    labelClassName="art_experience-title"
                    className="title-btn art_experience-button_outlined"
                    label="ArtExperience" /> */}
                {
                    toolbarButtons.map((button, i) => {
                        return <Button key={i} href={button.href} className="art_experience-button_outlined toolbar-btn" label={button.label} />
                    })
                }
            </div>
            <div className="right-box">
                <ReserveModal />
                {/* <AccountMenu /> */}
            </div>
        </div>
    );
}