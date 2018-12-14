// @flow
import { lifecycle, withHandlers, compose } from 'recompose';

type GetDataT = ({}) => () => void;

let enabled = true;

export const disableFetching = () => (enabled = false);
export const enableFetching = () => (enabled = true);

export default (getData: GetDataT) =>
  compose(
    withHandlers({
      getData,
    }),
    lifecycle({
      componentWillMount() {
        if (enabled) {
          const { getData } = this.props;
          getData();
        }
      },
    })
  );
