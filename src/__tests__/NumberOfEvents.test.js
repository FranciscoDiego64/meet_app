import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents.js";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render component", () => {
    expect(NumberOfEventsWrapper.find(".number-of-events")).toHaveLength(1);
  });

  test("render input for number of events", () => {
    expect(NumberOfEventsWrapper.find(".number-of-events-input")).toHaveLength(1);
  });

  test("render number of events default input", () => {
    expect(
      NumberOfEventsWrapper.find(".number-of-events-input").prop("value")
    ).toBe(32);
  });
});