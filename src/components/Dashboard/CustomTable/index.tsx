import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '../../Button';
import { SearchField } from '../../SearchField';
import { Grid, Paper } from '@material-ui/core';
import './Table.scss';
import '../../../styles/ArtExperienceButtons.scss';
export const CustomTable = (props: {
    items: any[],
    headers: { text: string, value: string }[],
    noItemsMessage?: string,
    noSearchMessage?: string,
    showSearchField?: boolean,
}) => {
    const [filtredItems, setFiltredItems] = useState(props.items || []);
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
            <div>
                <SearchField
                    items={filtredItems}
                    onChangeResults={setFiltredItems}
                    itemFilter="nameClient"
                    fieldLabel="Buscar"
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
                {filtredItems.map((row: any, rowIndex) => {
                    return (
                        <div className="table-box" key={rowIndex}>
                            <div className="left-box">
                            </div>
                            <div className="content-box">
                                <div className={classes.root}>
                                    {/* HEADER */}
                                    {rowIndex === 0 ? (
                                        <div className="header">
                                            <Grid container xl={12} spacing={3}>
                                                {
                                                    props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                                        return (
                                                            <Grid item xs={2} xl={2} sm={2} key={headerIndex}>
                                                                <Button className="art_experience-button_only-text" label={header.text} />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </div>
                                    ) : null}
                                    {/* ROWS */}
                                    <div className="row">
                                        <Grid container xl={12} spacing={3}>
                                            {
                                                props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                                    return (
                                                        <Grid item xs={2} xl={2} sm={2} key={headerIndex}>
                                                            {
                                                                header.value != 'status' ? (
                                                                    <p
                                                                        className="item_table-text"
                                                                    >{row[header.value]}</p>
                                                                ) : (
                                                                        <Button className="art_experience-button_outlined" label="status" />
                                                                    )
                                                            }
                                                        </Grid>
                                                    )
                                                })
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
        </div >
    );
}