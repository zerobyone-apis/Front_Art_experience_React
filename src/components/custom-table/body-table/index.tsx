import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { RowTable } from '../row-table';
import { HEADER } from '../table.type';

export const BodyTable = (props: {
  items: any[]
  headers: HEADER[]
  onSelectRow: () => void
  onEditRow: () => void
}) => {

  const [selectedRow, setSelectedRow] = useState(null);

  /* Style in header and rows */
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    })
  )

  const classes = useStyles();

  return (
    <div className="table-content">
      <div className="row-box">
        {props.items.length && props.items.map((row, i) => {
          return (
            <div className="table-box" key={i}>
              <div className="content-box">
                <div className={classes.root}>
                  <RowTable
                    item={row}
                    headers={props.headers}
                    selected={selectedRow == row}
                    onSelect={() => { setSelectedRow(row) }}
                    onEdit={() => { props.onEditRow }}
                  />
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  )
}
