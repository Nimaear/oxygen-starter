/* @flow */
export * as AppActions from './app.actions';
export { default as AppActionTypes } from './app.actions';

export default {};

export type ActionType = {
  type: String,
};

export type EntityActionType = ActionType & {
  entities: {},
};
