import React from 'react';
import styles from './DaysToSummer.scss';

class DaysToSummer extends React.Component {
  getDaysToSummer() {
    const currentDate = new Date();
    const summerStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 5, 21));
    const summerEnd = new Date(Date.UTC(currentDate.getUTCFullYear(), 8, 23));

    let days;

    if (summerStart <= currentDate && currentDate <= summerEnd) {
      days = '';
    } else if (currentDate > summerEnd) {
      const currentYear = currentDate.getUTCFullYear();
      const nextYear = currentYear + 1;
      const nextSummer = new Date(Date.UTC(nextYear, 5, 21));
      days = Math.floor((nextSummer.getTime() - currentDate.getTime()) / (1000*60*60*24)) + ' days to summer !';
    } else if (currentDate < summerStart) {
      const oneDay = new Date(Date.UTC(currentDate.getUTCFullYear(), 5, 20));
      if (currentDate.getTime() === oneDay.getTime()) {
        days = '1 day to summer !';
      } else {
        days = Math.floor((summerStart.getTime() - currentDate.getTime()) / (1000*60*60*24)) + ' days to summer !';
      }
    }

    return days ;
  }

  render() {
    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{this.getDaysToSummer()}</h3>
      </div>
    );
  }
}

export default DaysToSummer;