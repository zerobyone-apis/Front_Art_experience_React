import React from 'react';
import { AccountMenu } from '../AccountMenu';
import { ReservationModal } from '../ReservationModal';
import './Toolbar.scss';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <p className="title">ArtExperience</p>
            <ReservationModal />
            <AccountMenu />
            {/* <NotificationMenu /> */}
        </div>
    );
}
