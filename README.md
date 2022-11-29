## About

Meet App is a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Key Features:

+ Filter events by city.
+ Show/hide event details.
+ Specify number of events.
+ Use the app when offline.
+ Add an app shortcut to the home screen.
+ View a chart showing the number of upcoming events by city.

## Key Features in detail:

**Feature 1: Filter events by city**

>“As a user I should be able to filter events by city so that I can see the list of events that take place in that city”

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city.

Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list.

Given the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

**Feature 2: Show/hide an event’s details**

>“As a user I should be able to show and hide event’s details so that I can focus on the events that I’m interested in and avoid cluttering the page.”

Scenario 1: An event element is collapsed by default

Given a user has searched for an specific city,
When the list of events is shown,
Then all events’ details should be hidden.

Scenario 2: User can expand an event to see its details

Given a user was interested in an event
When she clicks on an event
Then all event information should be displayed

Scenario 3: User can collapse an event to hide its details

Given the user got all necessary information on an event
When she clicks on a “show less details” button
Then the event information should be hidden

**Feature 3: Specify number of events**

>“As a user I should be able to specify the number of events that are displayed so that I can see more or less events at once.”

Scenario 1: When user hasn’t specified a number, 32 is the default number

Given the user did not specify the number of events to be displayed
When she filters events by city
Then 32 will be the default number of displayed events

Scenario 2: User can change the number of events they want to see

Given the user wanted to see more or less events at once
When a filter is applied
Then the desired amount of events will be shown

**Feature 4: Use the app when offline**

>“As a user I should be able to access the app at all times so that I can have access to my events when I run out of mobile data or there is no service coverage.”

Scenario 1: Show cached data when there’s no internet connection

Given the user wanted to access the app on the go,
When connection to internet is lost,
Then the app should still work by showing data taken from an offline cache.

Scenario 2: Show error when user changes the settings (city, time range)

Given default time and city settings,
When a user changes city and time settings,
Then an error message should be displayed.

**Feature 5: Data Visualisation**

>“As a user I should be able to have a clear visualisation of the events in all cities so that I can keep better track of them.”

Scenario 1: Show a chart with the number of upcoming events in each city

Given the user chooses a specific city
When the user wants to view data regarding future events
Then the desired visualisation chart will be displayed


[Link to Meet App](https://franciscodiego64.github.io/meet/)
