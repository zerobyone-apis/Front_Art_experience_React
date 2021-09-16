import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import './text.scss';

export const Text = (props: {
    type: 'title' | 'subtitle' | 'text' | 'small',
    color?: 'primary' | 'secondary',
    position?: 'left'| 'right' | 'center',
    children: string
    className?: string
    autoSize?: boolean
}) => {
    const {
        // @ts-ignore
        getTheme,
    } = useContext(ThemeContext);

    return (
        <p className={`dmz-text ${props.color} theme-${props.type} ${getTheme()} ${props.className} position-${props.position}`}>
            {props.children}
        </p>
    )
}