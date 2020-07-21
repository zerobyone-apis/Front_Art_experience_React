import React from 'react';
import { Loader } from '../Loader';
import './LoaderPage.scss';

export const LoaderPage = (props: {
    show: boolean
}) => {
    const showLoader = () => {
        if (props.show) {
            return (
                <div className="loader_page">
                    <div className="loader-box">
                        <Loader />
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    return showLoader();
}