<!-- ABOUT THE PROJECT -->

## About The Project

Company Balance sheet

This repo has backend and frontend projects. Backend is written using GoLang with Gorilla mux to create api and on front end side React Js is being used.

Backend creates an api to fetch company balance sheet by calling another container service. React App calls GoLang api to display data in basic html table.

React app has been created using vite js and add minimal configuration require for development with some basic unit testing. React testing library and vitest are used for testing with msw module to mock api call.

GoLang has a basic tet setup which mocks api call using MockHttpClient.

#### How to run?

- Clone this repo
- Run command in terminal for running in dev

`chmod u+x ./bin/deploy.sh`

```
  bin/deploy.sh dev up
```

Frontend ui is running in port 3001

Backend api is running in port 4000

- Run command in terminal for unit testing.

```
  bin/deploy.sh test up
```
