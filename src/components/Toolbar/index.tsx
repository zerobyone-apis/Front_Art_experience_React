import { AccountMenu } from '../AccountMenu';
import { NotificationMenu } from '../NotificationMenu';
import './Toolbar.scss';

export const Toolbar = () => {
    return (
        <div className="toolbar">
            <p className="title">WeeCollab</p>
            <AccountMenu />
            <NotificationMenu />
        </div>
    );
}
