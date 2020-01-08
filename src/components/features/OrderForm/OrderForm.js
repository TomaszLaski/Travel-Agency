import React from 'react';
import {Col, Row} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption.js';
import Pricing from '../../../data/pricing.json';

console.log(Pricing);

const OrderForm =  (props) => (
  // 18.3 wyświetlanie pojedynczej opcji:
  <Row>
    {Pricing.map((option) => (
      <Col md={4} key={option.id}>
        <OrderOption {...option}
          /*przekazanie do orderOption props z currentValue o wartości options[id]: */ 
          currentValue={props.options[option.id]}
          setOrderOption={props.setOrderOption} />
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary tripCost={props.tripCost} options={props.options} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;