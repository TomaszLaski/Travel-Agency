import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {

  it('should render link to proper adress', () => {
    const propsId = 'abc'; 
    const component = shallow(<TripSummary id={propsId} />);
    const renderedLink = component.find('.link').prop('to')
    expect(renderedLink).toEqual(`/trip/${propsId}`);
  });

  it('should have correct src and alt', () => {    
    const expectedSrc = 'image';
    const expectedAlt = 'name';
    const component = shallow(<TripSummary image={expectedSrc} name={expectedAlt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct props name, cost, days', () => {

    const component = shallow(<TripSummary name='trip name' cost='42' days={420} />);
    expect(component.find('.title').text()).toEqual('trip name');
    expect(component.find('.details span').at(1).text()).toEqual(`from ${'42'}`);
    expect(component.find('.details span').at(0).text()).toEqual(`${420} days`);
  });

  it('should throw error without required props: id, image, name, cost, days', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags array correctly', () => {
    const tagArray = ['first', 'second', 'third'];
    const component = shallow(<TripSummary tags={tagArray} />);

    expect(component.find('.tags span').at(0).text()).toEqual(tagArray[0]);
    expect(component.find('.tags span').at(1).text()).toEqual(tagArray[1]);
    expect(component.find('.tags span').at(2).text()).toEqual(tagArray[2]);
  });

  it('should render tags div if tags is truthy', () => {
    const component = shallow(<TripSummary tags={[]} />);
    expect(component.find('.tags')).toBeTruthy();
  });

});