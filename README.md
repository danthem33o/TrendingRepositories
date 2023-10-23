# Project

This project helps discover trending repositories that were created in the last seven days.

## About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Styles

This project uses [material-ui](https://mui.com/) for its theming and components. Re-usable components can be found in the `components` folder.

### APIs

APIs can be found under the `api` directory. [axios](https://axios-http.com/docs/intro) is used as the HTTP client.

### State

Application state can be found under `state`. State is encapsulated and can only be retrieved by using the `useStateContext` hook. Slices of state are split across multiple repositories and can only be accessed or updated by action and selector hooks. Action and selector hooks are re-exported from a single hook that is consumed by the application.

## Testing

Test files are saved with the postfix of either `**.spec.ts`, `**.test.ts` or `**.test.tsx`. [Cypress](https://www.cypress.io/) is the test automation library used to provide the end-to-end tests. Please see the commands below on how to run the end-to-end tests. [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro/) has been used to provide further Cypress commands.

Cypress tests can be found in `./cypress/e2e`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `e2e`

Runs the end-to-end test suit. This will run the Cypress tests in headless mode.

### `e2e:open`

Runs the end-to-end test suit. This will run the Cypress tests in headed mode and will run the tests in the browser.
