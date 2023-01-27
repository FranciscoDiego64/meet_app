import React, { Component } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import './nprogress.css';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: []
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
     }
    }

  componentWillUnmount(){
    this.mounted = false;
  }


  updateEvents = (location, eventCount) => {
    const { numberOfEvents } = this.state;
    if (location === undefined) location = this.state.selectedLocation;
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      eventCount = eventCount === undefined ? numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    });
  };

  /*updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
*/

getData = () => {
  const { locations, events } = this.state;
  const data = locations.map((location) => {
    const number = events.filter(
      (event) => event.location === location
    ).length;
    const city = location.split(', ').shift();
    return { city, number };
  });
  return data;
};
  

render() {
  const { locations, events, numberOfEvents, showWelcomeScreen } = this.state;

  if (showWelcomeScreen === undefined) return <div className="App" />;

  return (
    <div className="App">
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <div className="OfflineAlert">
        {!navigator.onLine && (
          <OfflineAlert
            text={
              'You are currently offline. The list of events may not be up-to-date.'
            }
          />
        )}
      </div>
      <CitySearch
        locations={this.state.locations}
        updateEvents={this.updateEvents}
      />
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        updateEvents={this.updateEvents}
      />
      <h4>Events in each city</h4>

<div className="data-vis-wrapper">
  <EventGenre events={events} />
  <ResponsiveContainer height={400}>
    <ScatterChart
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="category" dataKey="city" name="city" />
      <YAxis
        allowDecimals={false}
        type="number"
        dataKey="number"
        name="number of events"
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter data={this.getData()} fill="#8884d8" />
    </ScatterChart>
  </ResponsiveContainer>
</div>
<EventList events={events} />
      
      <WelcomeScreen
        showWelcomeScreen={showWelcomeScreen}
        getAccessToken={() => {
          getAccessToken();
        }}
      />
    </div>
    );
   }
  }


export default App;

