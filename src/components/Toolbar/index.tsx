import React from 'react';
import { AccountMenu } from '../AccountMenu';
import { ReservationModal } from '../ReservationModal';
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
                <p className="art_experience-title title">ArtExperience</p>
                {
                    toolbarButtons.map((button, i) => {
                        return <Button key={i} href={button.href} className="art_experience-button toolbar-btn" label={button.label} />
                    })
                }
            </div>
            <div className="right-box">
                <ReservationModal className="reservationModal" />
                {/* <AccountMenu /> */}
            </div>
        </div>
    );
}
