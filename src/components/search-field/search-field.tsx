// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import './search-field.scss';
import '../../styles/theme.scss';

export const SearchField = (props: {
  defaultValue?: string;
  items: any[];
  itemFilter: { text: string, value: string };
  showButton?: boolean;
  onChangeResults: (filtredItems: any) => void;
  className?: string;
  buttonLabel?: string;
  fieldLabel?: string;
}) => {
  const [fieldValue, setFieldValue] = useState('');
  const [filtredItems, setFiltredItems] = useState(props.items || []);

  useEffect(() => {
    console.log('Item filter', props.itemFilter)
    setFieldValue('')
    filterItems()
  }, [props.itemFilter])

  useEffect(() => {
    filterItems();
  }, [fieldValue]);

  useEffect(() => {
    props.onChangeResults(filtredItems);
  }, [filtredItems]);

  const filterItems = () => {
    let items = filtredItems.filter(item => {
      let formattedText = (String(item[props.itemFilter.value]) || '').toLowerCase();
      return (formattedText.indexOf(fieldValue) !== -1);
    })
    props.onChangeResults(items);
  }
  return (
    <div className={`search-field ${props.className}`}>
      <TextField
        name="searchField"
        onChange={setFieldValue}
        label=""
        hint={!fieldValue && props.fieldLabel ? props.fieldLabel : ''} // TODO fix problems of click and insert text
        className="search-text_field theme-text_field--dark"
        icon="faSearch"
        iconColor="grey"
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