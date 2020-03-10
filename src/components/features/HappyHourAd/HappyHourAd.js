import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';
import { formatTime } from '../../../utils/formatTime';

class HappyHourAd extends React.Component {
  constructor(){
    super();
    setInterval(() =>{
      this.forceUpdate();
    }, 1000);
  }
    static propTypes = {
      title: PropTypes.string,
      description: PropTypes.string,
    }
    getCountdownTime(){
      const currentTime = new Date();
      const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
      
      if(currentTime.getUTCHours() >= 12){
        nextNoon.setUTCDate(currentTime.getUTCDate()+1);
      }
      
      return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
    }
    render() {
      const countdownTime = this.getCountdownTime();
      const { title, description } = this.props;
      return (
        <div className={styles.component}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.promoDescription}>{countdownTime > 23 * 60 * 60 ? description : formatTime(countdownTime)}</div>
        </div>
      );
    }
}
export default HappyHourAd;