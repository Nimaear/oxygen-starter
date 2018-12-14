//@flow
import { defaultProps, componentFromProp } from 'recompose';

export default (comp) => {
  const enhance = defaultProps({ as: comp });
  return enhance(componentFromProp('as'));
};
