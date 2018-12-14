//@flow
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

type PropsType = {
  goBack: () => void,
};

const NotFound = ({ goBack }: PropsType) => {
  return (
    <div>
      <h1>Not found</h1>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default compose(
  withRouter,
  withHandlers({
    goBack: ({ history }) => () => history.goBack(),
  })
)(NotFound);
