import assign from 'object-assign';
import { REQUEST_AGGREGATIONS, RECEIVE_AGGREGATIONS } from '../constants';

export default (state = {
  isFetching: false,
  items: {},
  invalidated: false,
  params: {},
}, action) => {
  switch (action.type) {
  case REQUEST_AGGREGATIONS:
    return assign({}, state, {
      isFetching: true,
      invalidated: false,
      params: action.payload,
    });
  case RECEIVE_AGGREGATIONS:
    return assign({}, state, {
      isFetching: false,
      invalidated: false,
      items: action.payload,
    });
  default:
    return state;
  }
};
