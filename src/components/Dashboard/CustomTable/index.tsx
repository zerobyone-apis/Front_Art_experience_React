import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Grid, Paper } from '@material-ui/core';
import './Table.scss';
export const CustomTable = (props: {
    items: any[],
    headers: { text: string, value: string }[]
}) => {
    const [items, setItems] = useState(props.items || []);
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

    // useEffect(()=>{
    //     items.unshift(headers)
    // },[])

    return (
        <div className="table-box">
            <div className="no-orders">
                {/* <p>No tiene ordenes creadas</p> */}
            </div>
            <div className="no-orders">
                {/* <p>No se encontraron coincidencias</p> */}
            </div>

            <div className="table">
                {items.map((row: any, rowIndex) => {
                    return (
                        <div className="order" key={rowIndex}>
                            <div className="left-box">
                            </div>
                            <div className="content-box">
                                <div className={classes.root}>
                                    {/* HEADER */}
                                    <Grid container xs={12} xl={12} sm={12} spacing={3}>
                                        {
                                            props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                                return (
                                                    <Grid item xs={2} xl={2} sm={2} spacing={2}>
                                                        <p
                                                            className="item_table-text"
                                                        >{header.text}</p>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                    {/* ROWS */}
                                    <Grid container xs={12} xl={12} sm={12} spacing={3}>
                                        {
                                            props.headers.map((header: { text: string, value: string }, headerIndex) => {
                                                return (
                                                    <Grid item xs={2} xl={2} sm={2} spacing={2}>
                                                        {
                                                            header.value != 'status' ? (
                                                                <p
                                                                    className="item_table-text"
                                                                >{row[header.value]}</p>
                                                            ) : null
                                                        }
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
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
