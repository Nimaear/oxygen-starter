import { combineReducers } from 'redux';
import app from 'reducers/app.reducer';

export default () => {
  return combineReducers({
    app,
  });
};
