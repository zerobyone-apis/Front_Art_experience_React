import { AccountMenu } from '../AccountMenu';
import { NotificationMenu } from '../NotificationMenu';
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
