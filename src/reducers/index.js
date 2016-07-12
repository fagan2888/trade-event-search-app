import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import { results } from './results';

export default combineReducers({
  form,
  results,
  routing,
});