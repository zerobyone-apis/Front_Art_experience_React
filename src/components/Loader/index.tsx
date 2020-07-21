import React from 'react';
import './Loader.scss';
import { FaCut } from 'react-icons/fa'

export const Loader = () => {
    return (
        <div className="loader">

            <div className="lds-ellipsis">
                {/* <p className="title">Cargando</p> */}
                <FaCut className="icon" />
                <FaCut className="icon" />
                <FaCut className="icon" />
                <FaCut className="icon" />
            </div>
        </div>
    )
}