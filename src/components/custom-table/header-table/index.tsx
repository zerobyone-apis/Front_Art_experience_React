import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Button } from '../../inputs/button';
import { SearchField } from '../../inputs/search-field/search-field';
import { BodyTable } from '../body-table';
import { FooterTable } from '../footer-table';
import { HEADER } from '../table.type';
import './header-table.scss';

export const HeaderTable = (props: {
    rowsToFilter: any[]
    sortColumnByHeader: any
    headers: HEADER[]
}) => {

    const [selectedHeader, setSelectedHeader] = useState(props.headers[0]);
    const [arrowUp, setArrowUp] = useState(true);
    const [filtredRows, setFiltredRows] = useState(props.rowsToFilter);

    useEffect(() => {
        sortRows()
    }, [arrowUp]);

    const onSelectHeader = (selected: HEADER) => {
        setSelectedHeader(selected);
        setArrowUp(res => !res)
    }

    const sortRows = () => {
        let copyRows = props.rowsToFilter;
        if (selectedHeader.value === 'startTimeFront') {
            const moment = require('moment');
            copyRows = copyRows.sort(
                (a: { startTime: string }, b: { startTime: string }) =>
                    new moment(a.startTime)
                        .format('YYYYMMDD') - new moment(b.startTime).format('YYYYMMDD'))
        } else {
            copyRows = props.rowsToFilter.sort(compare);
        }
        if (!arrowUp) {
            copyRows.reverse();
        }
        setFiltredRows(copyRows);
    }

    const compare = (a: any, b: any) => {
        let headerValue = selectedHeader.value;
        /* sort column by another header */
        if (props.sortColumnByHeader) {
            if (headerValue === props.sortColumnByHeader.headerToAction) {
                headerValue = props.sortColumnByHeader.headerToSort;
            }
        }
        /* default sort by key */
        if (a[headerValue] < b[headerValue]) {
            return -1;
        }
        if (a[headerValue] > b[headerValue]) {
            return 1;
        }
        return 0;
    }

    const HeaderItem = (props: {
        label: string
        selected: boolean
        sortUp: boolean
        onSelect: () => void
    }) => {
        return (
            <Grid item xs onClick={() => { props.onSelect() }} className="header-item-box">
                <div className="header-item">
                    <Button
                        style="text"
                        label={props.label}
                        className={`${props.selected && 'selected'}`}
                    />
                    <div className="header_button-content">
                        {
                            props.selected && (
                                props.sortUp ? (
                                    <AiFillCaretUp className="icon" />
                                ) : (
                                        <AiFillCaretDown className="icon" />
                                    )
                            )
                        }
                    </div>
                </div>
            </Grid>
        )
    }

    return (
        <>
            <div className="header">
                <div className="search-field">
                    <SearchField
                        items={props.rowsToFilter}
                        onChangeResults={res => { setFiltredRows(res) }}
                        itemFilter={selectedHeader}
                        fieldLabel={`Buscar: ${selectedHeader.text}`}
                    />
                </div>
                <Grid container xl={12} spacing={3}>
                    {props.headers.map((header: HEADER, i) => {
                        return (
                            <HeaderItem
                                key={i}
                                label={header.text}
                                selected={selectedHeader == header}
                                sortUp={arrowUp}
                                onSelect={() => { onSelectHeader(header) }}
                            />
                        )
                    })
                    }
                </Grid>
            </div>
            {/* BODY */}
            <BodyTable
                items={filtredRows}
                headers={props.headers}
                onSelectRow={() => { }}
                onEditRow={() => { }}
            />
            {/* FOOTER */}
            <FooterTable totalRows={filtredRows.length} />
        </>
    )
}
