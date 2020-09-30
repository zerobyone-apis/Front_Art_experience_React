// eslint-disable-next-line no-unused-vars
import React, { ChangeEvent, useState, useEffect, useContext } from 'react';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { createStyles, FormControl, InputLabel, makeStyles, TextField, withStyles } from '@material-ui/core';
import { fade, Theme } from '@material-ui/core/styles';
import { customTheme } from '../../theme';
import InputBase from '@material-ui/core/InputBase';
import { ThemeContext } from '../../contexts/ThemeContext';
import './text-field.scss';

export const Textfield = (props: {
  label: string,
  value: string,
  name: string,
  onChange: any
}) => {

  const [value, setValue] = useState(props.value || '');

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
        margin: theme.spacing(2),
        paddingTop: theme.spacing(3)
      },
      root: {
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





  /* FUNCTIONS */

  const onChangeValue = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    props.onChange(value, name);
  }




  return (
    <form className={classes.root} noValidate>
      <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="input">
          {props.label}
        </InputLabel>
        <CustomTextField
          id="input"
          name={props.name}
          value={props.value}
          onChange={onChangeValue} />
      </FormControl>
    </form>
  )
}
