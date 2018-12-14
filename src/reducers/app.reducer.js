// @flow
import createReducer from 'store/createReducer';
import AppActions from 'actions/app.actions';

export const initialState = {
  init: false,
  menuShown: false,
};

export default createReducer(initialState, {
  [AppActions.INIT]: (draft) => {
    draft.init = true;
  },
  [AppActions.SHOW_MENU]: (draft) => {
    draft.menuShown = true;
  },
  [AppActions.TOGGLE_MENU]: (draft) => {
    draft.menuShown = !draft.menuShown;
  },
  [AppActions.HIDE_MENU]: (draft) => {
    draft.menuShown = false;
  },
});
