//@flow
import localForage from 'localforage';
import merge from 'lodash.merge';

const storage = localForage.createInstance({
  name: 'Break Free',
});

export const hibernateStore = (initialState) => {
  const persistedState = {
    ...initialState,
  };
  return storage.getItem('entity').then((entity) => {
    if (entity) {
      Object.keys(entity).forEach((key) => {
        persistedState.entity[key] = merge(persistedState.entity[key], entity[key]);
      });
    }
    return persistedState;
  });
};

export default (state) => {
  storage.setItem('entity', state.entity);
};
