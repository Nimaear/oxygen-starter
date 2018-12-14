// @flow
const ActionTypes = {
  SELECT: '@overview/select',
  UNSELECT: '@overview/unselect',
  FETCH_REQUEST: '@overview/requestFetch',
  FETCH_START: '@overview/startFetch',
  FETCH_SUCCESS: '@overview/succeedFetch',
  FETCH_FAIL: '@overview/failFetch',
  SET_SELECT_ALL: '@overview/setSelectAll',
  SET_ACTION: '@overview/setAction',
};

export const requestFetch = (overviewType: string, variables) => ({
  type: ActionTypes.FETCH_REQUEST,
  overviewType,
  variables,
});

export const startFetch = (overviewType: string) => ({
  type: ActionTypes.FETCH_START,
  overviewType,
});

export const succeedFetch = (overviewType: string, data: {}) => ({
  type: ActionTypes.FETCH_SUCCESS,
  overviewType,
  ...data,
});

export const failFetch = (overviewType: string, error: string) => ({
  type: ActionTypes.FETCH_FAIL,
  overviewType,
  error,
});

export const select = (overviewType: string, itemId: string) => ({
  type: ActionTypes.SELECT,
  overviewType,
  itemId,
});

export const unselect = (overviewType: string, itemId: string) => ({
  type: ActionTypes.UNSELECT,
  overviewType,
  itemId,
});

export const setSelectAll = (overviewType: string, selectAll: string) => ({
  type: ActionTypes.SET_SELECT_ALL,
  overviewType,
  selectAll,
});

export const setAction = (overviewType: string, action: string) => ({
  type: ActionTypes.SET_ACTION,
  overviewType,
  action,
});

export default ActionTypes;
