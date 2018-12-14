// @flow
const ActionTypes = {
  INIT: 'app/init',
  SHOW_MENU: 'app/showMegaMenu',
  HIDE_MENU: 'app/hideMegaMenu',
  TOGGLE_MENU: 'app/toggleMegaMenu',
  GET_GRAPH: 'app/getGraph',
  PERSIST_STORE: 'app/persistStore',
};

export const init = () => ({
  type: ActionTypes.INIT,
});

export const showMegaMenu = () => ({
  type: ActionTypes.SHOW_MENU,
});

export const toggleMegaMenu = () => ({
  type: ActionTypes.TOGGLE_MENU,
});

export const hideMegaMenu = () => ({
  type: ActionTypes.HIDE_MENU,
});

export const persistStore = () => ({
  type: ActionTypes.PERSIST_STORE,
});

export default ActionTypes;
