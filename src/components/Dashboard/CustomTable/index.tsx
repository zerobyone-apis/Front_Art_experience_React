import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../Button';
import { SearchField } from '../../SearchField';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { Grid } from '@material-ui/core';
import './Table.scss';
import '../../../styles/ArtExperienceButtons.scss';
import '../../../styles/ArtExperienceFonts.scss';

export const CustomTable = (props: {
    title: string,
    items: any[],
    headers: { text: string, value: string }[],
    mobileHeaders?: { text: string, value: string }[],
    noItemsMessage?: string,
    noSearchMessage?: string,
    showSearchField?: boolean,
    onSelectRow: any,
}) => {
    const [filtredItems, setFiltredItems] = useState(props.items || []);
    const [selectedHeader, setSelectedHeader] = useState(props.mobileHeaders[0]);
    const windowSize = useWindowSize();
    const gridsMobileHeaders: any = (12 / props.mobileHeaders.length || 6);
    const gridDefaultHeaders: any = (12 / props.headers.length || 2);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }),
    );
    const classes = useStyles();
    return (
        <div className="custom-table">
            <h1 className="title font-title art_experience-text-light"
            >
                {props.title}
            </h1>
            <div className="search-field">
                <SearchField
                    items={filtredItems}
                    onChangeResults={setFiltredItems}
                    itemFilter={selectedHeader}
                    fieldLabel={`Buscar por: ${selectedHeader.text}`}
                />
            </div>
            {!filtredItems && props.noItemsMessage ?
                (
                    <div className="no-orders">
                        <p>{props.noItemsMessage}</p>
                    </div>
                ) : null
            }
            {!filtredItems && props.noSearchMessage ?
                (
                    <div className="no-orders">
                        <p>{props.noSearchMessage}</p>
                    </div>
                ) : null
            }
            <div className="table">
                {/* HEADER */}
                <div className="header">
                    <Grid container xl={12} spacing={3}>
                        {(windowSize.screenMode() == 'md') ? (
                            props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                return (
                                    <Grid item xs={gridDefaultHeaders} xl={gridDefaultHeaders} sm={gridDefaultHeaders}
                                        key={headerIndex}
                                        className={`header_${headerIndex}`}>
                                        <Button
                                            className={`${(selectedHeader == header) ? 'selected' : ''} art_experience-button_only-text`}
                                            label={header.text}
                                            onClick={() => {
                                                setSelectedHeader(header)
                                            }}
                                        />
                                    </Grid>
                                )
                            })
                        ) : (
                                props.mobileHeaders.map((header: { text: string, value: string }, headerIndex) => {
                                    return (
                                        <Grid item xs={gridsMobileHeaders} xl={gridsMobileHeaders} sm={gridsMobileHeaders}
                                            key={headerIndex}
                                            className={`header_${headerIndex}`}>
                                            <Button
                                                className={`${(selectedHeader == header) ? 'selected' : ''} art_experience-button_only-text`}
                                                label={header.text}
                                                onClick={() => {
                                                    setSelectedHeader(header)
                                                }}
                                            />
                                        </Grid>
                                    )
                                })
                            )
                        }
                    </Grid>
                </div>

                <div className="row-box">
                    {filtredItems.map((row: any, rowIndex) => {
                        return (
                            <div className="table-box" key={rowIndex}>
                                <div className="content-box">
                                    <div className={classes.root}>
                                        {/* ROWS */}
                                        <div className="row">
                                            <Grid container xl={12} spacing={3}>
                                                {(windowSize.screenMode() == 'md') ? (
                                                    props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                                        return (
                                                            <Grid item xs={gridDefaultHeaders} xl={gridDefaultHeaders} sm={gridDefaultHeaders}
                                                                key={headerIndex}
                                                                className={`cell cell_${headerIndex}`}>
                                                                {header.value != 'status' ? (
                                                                    <p
                                                                        className={`${(selectedHeader == header) ? 'selected' : ''} item_table-text`}
                                                                    >{row[header.value]}</p>
                                                                ) : (
                                                                        <Button className="state-btn art_experience-button_outlined" label="status" />
                                                                    )
                                                                }
                                                            </Grid>
                                                        )
                                                    })
                                                ) : (
                                                        props.mobileHeaders.map((header: { text: string, value: string }, headerIndex) => {
                                                            return (
                                                                <Grid item xs={gridsMobileHeaders} xl={gridsMobileHeaders} sm={gridsMobileHeaders}
                                                                    key={headerIndex}
                                                                    className={`row_${headerIndex}`}>
                                                                    {
                                                                        header.value != 'status' ? (
                                                                            <p
                                                                                className={`${(selectedHeader == header) ? 'selected' : ''} item_table-text`}
                                                                            >{row[header.value]}</p>
                                                                        ) : (
                                                                                <Button className="art_experience-button_outlined" label="status" />
                                                                            )
                                                                    }
                                                                </Grid>
                                                            )
                                                        })
                                                    )
                                                }
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-box">
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}
