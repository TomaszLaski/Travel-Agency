import {connect} from 'react-redux';
import OrderForm from './OrderForm';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
});
//dispatcher akcji setorderoption importowanej z orderRedux do propsa o tej samej nazwie :
const mapDispatchToProps = dispatch =>({
  setOrderOption: (option) => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);