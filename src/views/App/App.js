//@flow
import * as React from 'react';
import 'styles/index.css';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router';
import { Home, NotFound, Example } from 'routes';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/example" component={Example} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};

export default compose(withRouter)(App);
