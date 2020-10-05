// eslint-disable-next-line no-unused-vars
import React, {
  ChangeEvent,
  useState,
  useEffect,
  useContext,
  RefObject,
  ReactElement,
} from 'react';
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  TextField,
  withStyles,
} from '@material-ui/core';
import {
  createMuiTheme,
  fade,
  MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles';
import { customTheme } from '../../theme';
import InputBase from '@material-ui/core/InputBase';
import { ThemeContext } from '../../contexts/ThemeContext';
import './text-field.scss';
import { FormContext } from '../../contexts/FormContext';
import { stringify } from 'querystring';

export const Textfield = (props: {
  id: string;
  label: string;
  name: string;
  children?: ReactElement;
  type: 'string' | 'text' | 'email' | 'password' | 'number';
  equalField?: string;
  value?: string | number;
}) => {
  const { setField, getErrorByField, validationIsActive } = useContext(
    FormContext
  );
  const {
    // @ts-ignore
    getTheme,
  } = useContext(ThemeContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      margin: {
        paddingTop: theme.spacing(3),
      },
      root: {
        '& input': {
          color: 'white',
        },
        margin: 'auto',
        '& label': {
          color: customTheme.text.color.dark,
        },
      },
    })
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: customTheme.pallette.primary,
      },
      secondary: {
        main: customTheme.pallette.secondary,
      },
    },
  });

  const classes = useStyles();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setField(props.name, props.type, error, value, props.equalField);
  }, [value]);

  useEffect(() => {
    if (props.value) {
      setValueOnReserveTextfield('');
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const setValueOnReserveTextfield = (e) => {
    if (props.value) {
      setValue(String(props.value));
    } else {
      handleChange(e);
    }
  };

  const customLabels = [
    'nameClient',
    'mailClient',
    'celClient',
    'startTimeFront',
    'barberName',
    'workToDo',
    'totalCost',
  ];


  return (
    <MuiThemeProvider theme={theme}>
      <FormControl className={classes.margin}>
        <div className={classes.root}>
          <InputLabel shrink htmlFor={props.id}>
            {props.label}
          </InputLabel>
        </div>
        {/* {props.name in customLabels ? (
          <TextField
            className={classes.root}
            value={value}
            type={props.type}
            onChange={handleChange}
            color="primary"
            error={
              validationIsActive() &&
              (getErrorByField(props.name) ? true : false)
            }
            helperText={getErrorByField(props.name)}
          />
        ) : ( */}
        <TextField
          className={classes.root}
          value={value}
          type={props.type}
          color="primary"
          onChange={handleChange}
          error={
            validationIsActive() &&
            (getErrorByField(props.name) ? true : false)
          }
          helperText={getErrorByField(props.name)}
        />
          )
          {/* } */}
      </FormControl>
    </MuiThemeProvider>
  );
};
