//@flow
import * as React from 'react';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import { ErrorBoundary } from 'components';

const withErrorBoundary = () =>
  compose(
    lifecycle({
      componentDidCatch(error, info) {
        this.setState({ error, info });
      },
      componentDidUpdate() {
        this.setState({ error: null, info: null });
      },
    }),
    branch(({ error }) => error, renderComponent(({ error, info }) => <ErrorBoundary error={error} info={info} />))
  );

export default withErrorBoundary;
