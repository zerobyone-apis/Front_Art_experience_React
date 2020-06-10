// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent, useEffect } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import './SearchField.scss';

export const SearchField = (props: {
  defaultValue?: string;
  items: any[];
  itemFilter: string;
  showButton?: boolean;
  onChangeResults: (filtredItems: any) => void;
  className?: string;
  buttonLabel?: string;
  fieldLabel?: string;
}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [filtredItems, setFiltredItems] = useState([]);

  useEffect(() => {
    setFiltredItems(props.items);
  }, []);

  useEffect(() => {
    props.onChangeResults(filtredItems);
  }, [filtredItems]);

  const filterItems = () => {
    setFiltredItems(
      props.items.filter(item => {
        return (item[props.itemFilter] || '').toLowerCase().indexOf(fieldValue) != -1;
      })
    );
  }

  const onChange = (value: string) => {
    setFieldValue(value);
    filterItems();
  }

  return (
    <div className={`search-field ${props.className}`}>
      <TextField
        label={props.fieldLabel || 'Search'}
        className="search-text_field"
        name="search"
        icon="faSearch"
        iconColor="grey"
        type="text"
        value={props.defaultValue}
        onChange={onChange}
      />
      {
        props.showButton ? (
          <Button
            onClick={() => {
              filterItems();
            }}
            label={props.buttonLabel || 'Search'}
            className="search-btn" />
        ) : null
      }
    </div>
  );
}