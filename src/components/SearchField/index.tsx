// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent, useEffect } from 'react';
import { TextField } from '../TextField';
import { Button } from '../Button';
import './SearchField.scss';

export const SearchField = (props: {
  defaultValue?: string;
  items: any[];
  itemFilter: string;
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

  // CallBack of the textfield
  const onChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(value);
    filterItems();
  };

  return (
    <div className={`search-field ${props.className}`}>
      <TextField
        label={props.fieldLabel || 'Search'}
        className="search-text_field"
        name="search"
        type="text"
        value={props.defaultValue}
        onChange={onChange}
      />
      <Button
        onClick={() => {
          filterItems();
        }}
        label={props.buttonLabel || 'Search'}
        className="search-btn" />
    </div>
  );
}