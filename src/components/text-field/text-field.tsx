// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent, useState, useEffect, useContext, RefObject, ReactElement } from 'react';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { createStyles, FormControl, InputLabel, makeStyles, TextField, withStyles } from '@material-ui/core';
import { fade, Theme } from '@material-ui/core/styles';
import { customTheme } from '../../theme';
import InputBase from '@material-ui/core/InputBase';
import { ThemeContext } from '../../contexts/ThemeContext';
import './text-field.scss';
import { FieldElement } from 'react-hook-form';

export const Textfield = (props: {
  id: string,
  label: string,
  name: string,
  inputRef: any,
  children?: ReactElement
}) => {

  // const [value, setValue] = useState(props.value || '');

  /* STYLE */

  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const CustomTextField = withStyles((theme: Theme) =>
    createStyles({
      input: {
        borderRadius: customTheme.borderRadius,
        position: 'relative',
        backgroundColor: customTheme.pallette[getTheme()],
        border: `1px solid ${customTheme.pallette.secondary}`,
        fontSize: customTheme.text.fontSize.text,
        width: 'auto',
        padding: '5px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        color: customTheme.text.color[getTheme()],
        fontFamily: customTheme.text.fontFamily.join(','),
        '&:focus': {
          boxShadow: `${fade(customTheme.pallette.primary, 0.25)} 0 0 0 0.2rem`,
          borderColor: customTheme.pallette.primary,
        },
      },
    }),
  )(InputBase);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        // margin: theme.spacing(2),
        paddingTop: theme.spacing(3)
      },
      root: {
        margin: 'auto',
        '& label': {
          color: customTheme.text.color.dark
        },
        '& label.Mui-focused': {
          color: customTheme.pallette.secondary,
        },
      }
    }),
  );

  const classes = useStyles();

  return (
    <FormControl className={classes.margin}>
      <div className={classes.root}>
        <InputLabel shrink htmlFor={props.id}>
          {props.label}
        </InputLabel>
      </div>
      <CustomTextField
        id={props.id}
        name={props.name}
        inputRef={props.inputRef}
      />
    </FormControl>
  )
}