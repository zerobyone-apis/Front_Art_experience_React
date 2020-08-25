import React, { ReactChild } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ANIMATIONS } from '../../types/Animations.type';

export const AnimationBox = (
    props: {
        children: ReactChild,
        type: 'slide_top' | 'slide_left' | 'opacity' | 'scale',
        active: boolean,
        duration?: number
    }) => {

    const BoxStyled = styled(motion.div)`
        opacity: 0;
    `;
    const DEFAULT_DURATION = 2;

    const getAnimation = () => {
        switch (props.type) {
            case ANIMATIONS.SLIDE_TOP:
                return { scale: 0.8, opacity: 1 }
                break;
            case ANIMATIONS.SLIDE_LEFT:
                break;
            case ANIMATIONS.OPACITY:
                return { opacity: 1 }
                break;
            case ANIMATIONS.SCALE:
                return { scale: 0.8, opacity: 1 }
                break;
        }
    }

    return (
        <BoxStyled
            animate={getAnimation()}
            transition={{ duration: (props.duration ? props.duration : DEFAULT_DURATION) }}
        >
            {props.children}
        </BoxStyled>
    )
}