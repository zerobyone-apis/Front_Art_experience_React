import React, { Ref, useContext, useRef } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { UserContext } from '../../../../contexts/UserContext';
import { DASHBOARD_PAGE, INDEX_PAGE } from '../../../../types/Pages.type';
import { Button } from '../../../inputs/button';
import { Text } from '../../../decorators/text';
import './account-menu.scss';


export const AccountMenu = (props: {
    reff: any,
    onCloseSession: any
    pageName?: string,
}) => {


    const { getTheme } = useContext(ThemeContext);
    const { getUserData } = useContext(UserContext);


    return (
        <div ref={props.reff}
            className={`account-menu effect-opacity ${getTheme()}`}
        >


            <Text type="small">{getUserData().username}</Text>
            <Text type="small">{getUserData().email}</Text>


            {props.pageName === INDEX_PAGE && getUserData().admin && (
                <Button
                    style="outlined"
                    label="Gestion de Reservas"
                    className="item-list_btn"
                    onClick={() => {
                        document.location.href = '/Dashboard';
                    }}
                />
            )}


            {props.pageName === DASHBOARD_PAGE ? (
                <Button
                    style="outlined"
                    label="Pagina Principal"
                    className="item-list_btn"
                    onClick={() => {
                        document.location.href = '/';
                    }}
                />
            ) : null}


            <Button
                style="outlined"
                label="Cerrar Session"
                className="item-list_btn"
                onClick={() => props.onCloseSession()}
            />
        </div>
    )
}
