import React, { Component } from "react";

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    infoText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: value,
        errorText: "Please enter a number from 1 to 32",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
        infoText: '',
      });
    }

   this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div>
        <div className="number-of-events">
          <label>
            Number of Events:
            <input
              type="number"
              className="number-of-events-input"
              min="1"
              value={this.state.numberOfEvents}
              onChange={this.handleInputChanged}
            />
          </label>

          <div>
            <ErrorAlert text={this.state.infoText} />
          </div>
              
        </div>
      </div>
    );
  }
}

export default NumberOfEvents;