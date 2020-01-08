import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice.js';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.target.value)}
  >
    {console.log(event)}
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  values: PropTypes.array,
  required: PropTypes.string,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};
export default OrderOptionDropdown;