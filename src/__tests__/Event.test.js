import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('render event summary', () => {
    expect(EventWrapper.find('.summary')).toHaveLength(1);
  });

  test('render event summary correctly', () => {
    expect(EventWrapper.find('.summary').text()).toBe(event.summary);
  });

  test('render full event information', () => {
    expect(EventWrapper.find('.information')).toHaveLength(1);
  });

  test('render full event information correctly', () => {
    expect(EventWrapper.find('.information').text()).toBe(
      `${event.start.dateTime} ${event.start.timeZone} ${event.location}`
    );
  });

  test('render show details button', () => {
    expect(EventWrapper.find('.show-details')).toHaveLength(1);
  });

  test('Do not render details by default', () => {
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });

  test('Render details when show details button is clicked', () => {
    EventWrapper.find('.show-details').at(0).simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('render title and description when details visible', () => {
    EventWrapper.setState({ detailsVisible: true });
    expect(EventWrapper.find('.details-title')).toHaveLength(1);
    expect(EventWrapper.find('.details-link')).toHaveLength(1);
    expect(EventWrapper.find('.details-description')).toHaveLength(1);
  });

  test('render hide details button when details visible', () => {
    EventWrapper.setState({ detailsVisible: true });
    expect(EventWrapper.find('.hide-details')).toHaveLength(1);
  });

  test('Do not render details when hide details button is clicked', () => {
    EventWrapper.setState({ detailsVisible: true });
    EventWrapper.find('.hide-details').at(0).simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(0);
  });
});