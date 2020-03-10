import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  description: '.promoDescription',
};
  
const mockProps = {
  title: 'example title',
  description: 'basic description',
};
// FIRST TEST : CHECK IF COMPONENT RENDERS
describe('Component HappyHourAd', () => {
  it('should render without crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });
  // SECOND TEST: CHECK IF BOTH ELEMENTS RENDERS
  it('should render heading and description', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.description)).toEqual(true);
  });
  // THIRD TEST: CHECK IF HEADER GOT TEST FROM PROPS
  it('should display title and description from props', () => {
    const component = shallow(<HappyHourAd title={mockProps.title} description={mockProps.description}/>);
    expect(component.find(select.title).text()).toEqual(mockProps.title);
    // expect(component.find(select.description).text()).toEqual(mockProps.description);
  });
});
// 4th TEST: CHECK IF COMPONENT SHOWS PROPER SECOND NUMBER

const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length) {
      super(...args);
    } else {
      super (customDate);
    }
    return this;
  }

  static now() {
    return (new Date(customDate)).getTime();
  }
};

const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd {...mockProps} />);
    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};
  
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

// 5th TEST: CHECK IF COUNTDOWN REDUCES SHOWN NUMBER

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();    
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
    
    const component = shallow(<HappyHourAd {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.description).text();
    expect(renderedTime).toEqual(expectedDescription);
    
    global.Date = trueDate;
    jest.useRealTimers();
  });
};
    
describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});
// 6th TEST: CHECK IF INFO ABOUT PROMO SHOWS ON SITE START

describe('Component HappyHourAdd with mocked Date', () => {
  checkDescriptionAtTime('12:30:00', mockProps.description);
  checkDescriptionAtTime('12:59:59', mockProps.description);
  checkDescriptionAtTime('12:00:00', mockProps.description);
});
// 7th TEST: CHECK IF INFO ABOUT PROMO SHOWS THEN COUNTDOWN IS COMPLETE
describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:59:58', 3, mockProps.description);
  checkDescriptionAfterTime('12:59:59', 1, 23 * 60 * 60 + '');
});