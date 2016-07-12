import { stringify } from 'querystring';
import { reduce, snakeCase } from 'lodash';
import fetch from 'isomorphic-fetch';
import { REQUEST_RESULTS, RECEIVE_RESULTS, RECEIVE_FAILURE } from 'constants';
import config from '../config.js';

export function requestResults() {
  return {
    type: REQUEST_RESULTS,
  };
}

export function receiveResults(payload) {
  return {
    type: RECEIVE_RESULTS,
    payload,
  };
}

export function receiveFailure(error) {
  return {
    type: RECEIVE_FAILURE,
    error,
  };
}

const { host, apiKey } = config.api.csl;
function fetchResults(querystring) {
  return (dispatch) => {
    dispatch(requestResults(querystring));
    return fetch(`${host}?api_key=${apiKey}&${querystring}`)
      .then(response => response.json())
      .then(json => dispatch(receiveResults(json)));
  };
}

function shouldFetchResults(state) {
  const { results } = state;
  if (!results) {
    return true;
  } else if (results.isFetching) {
    return false;
  }
  return true;
}

function processParams(params) {
  return stringify(
    reduce(
      params,
      (result, value, key) => Object.assign(result, { [snakeCase(key)]: value }),
      {}
    )
  );
}

export function fetchResultsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState())) {
      return dispatch(fetchResults(processParams(params)));
    }
    return Promise.resolve([]);
  };
}