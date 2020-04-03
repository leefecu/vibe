import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  FETCH_LOCATIONS_BEGIN,
  FETCH_LOCATIONS_FAILUER,
  FETCH_LOCATIONS_SUCCESS,
} from './constants';
import { BaseApiUrl } from '../../../common/config';

//simulator - start
import { SimulatorMode } from '../../../common/global';
import { fetchLocations as simulateFetchLocations } from '../../../common/apiSimulator';
//simulator - end

import axios from 'axios';

export function fetchLocations() {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: FETCH_LOCATIONS_BEGIN,
  };
}

// worker Saga: will be fired on PLAYLISTS_FETCH_PLAYLISTS_BEGIN actions
export function* doFetchLocations() {
  let url = BaseApiUrl + '?cmd=fetchLocations';
  let res;
  try {
    //simulator - start
    if (SimulatorMode) {
      yield call(delay, 1000);
      res = simulateFetchLocations();
    }
    //simulator - end
    else {
      res = yield call(axios.get, url);
      res = res.request.responseText;
    }

    res = JSON.parse(res);
  } catch (err) {
    yield put({
      type: FETCH_LOCATIONS_FAILUER,
      payload: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: { locationData: res },
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchLocations() {
  yield takeLatest(FETCH_LOCATIONS_BEGIN, doFetchLocations);
}

// Redux reducer - please keep reducer pure (i.e. don't use callback or operations that create side effects)
export function reducer(state, action) {
  switch (action.type) {
    case FETCH_LOCATIONS_BEGIN:
      return {
        ...state,
        error: '',
        fetching: true,
      };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        error: '',
        fetching: false,
        locationData: {
          latitude: action.payload.locationData.Lat,
          longitude: action.payload.locationData.Lng,
          useLatLng: action.payload.locationData.UseLatLng,
          locations: action.payload.locationData.Locations,
        },
      };
    case FETCH_LOCATIONS_FAILUER:
      return {
        ...state,
        error: action.payload.error,
        fetching: false,
      };

    default:
      return state;
  }
}
