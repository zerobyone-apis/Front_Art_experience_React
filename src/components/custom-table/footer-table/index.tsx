import React, { useContext } from 'react';
import { Text } from '../../decorators/text';
import { TableContext } from '../TableContext';

export const FooterTable = (props: {
    leftItems?: any[]
    totalRows: number
}) => {

    return (
        <div className="table-footer">
            <div className="left-box">
                {props.leftItems && props.leftItems.map((item, i) => {
                    return <div key={i}>{item}</div>
                })}
            </div>
            <div className="pagination-box">
                <Text type="text">
                    {`Total: ${props.totalRows}`}
                </Text>
            </div>
        </div>
    )
}