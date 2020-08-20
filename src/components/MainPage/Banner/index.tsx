import React, { useContext } from 'react';
import './Banner.scss';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Banner = () => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    const BoxStyled = styled(motion.div)`
        display: flex;
        opacity: 0;
    `;

    const urlImage = "url(https://lh6.googleusercontent.com/proxy/sGPIfOpDBdIbW2kUprDAFEa3kxMpBjhegwDGzZoRrxny1TQWUX666MXQlTr-ujrj-Nugzn9yCroQtUzRuMh6JZOrqP5HrJB59XN8N-WomzS6sONOPkb6HEtdTLZb6bC206svYLyh0UWBgvmc=s0-d)";

    return (
        <div className={`banner ${getTheme()}`}>
            <div className="banner-img" style={{ backgroundImage: urlImage }}>
            </div>
            <div className="title-box">
                <div className="box-shadow_space">
                </div>
                {/* effect-opacity */}
                <BoxStyled
                    animate={{ scale: 0.8, opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <img
                        className="logo-img"
                        src="https://raw.githubusercontent.com/zerobyone-apis/Front_Art_experience_React/master/src/assets/gold_logo.png" alt="" />
                </BoxStyled>
                <div className="box-shadow_logo">
                </div>
            </div>
        </div>
    )
}