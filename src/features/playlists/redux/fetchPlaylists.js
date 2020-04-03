import { delay, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  PLAYLISTS_FETCH_PLAYLISTS_BEGIN,
  PLAYLISTS_FETCH_PLAYLISTS_SUCCESS,
  PLAYLISTS_FETCH_PLAYLISTS_FAILURE,
  PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR,
} from './constants';
import { BaseApiUrl } from '../../../common/config'

//simulator - start
import { SimulatorMode } from '../../../common/global';
import { fetchPlaylists as simulateFetchPlaylists } from '../../../common/apiSimulator';
//simulator - end

import axios from 'axios';

export function fetchPlaylists(sampleParam) {
  // If need to pass args to saga, pass it with the begin action.
  return {
    type: PLAYLISTS_FETCH_PLAYLISTS_BEGIN,
    sampleParam: sampleParam
  };
}

export function dismissFetchPlaylistsError() {
  return {
    type: PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR,
  };
}

// worker Saga: will be fired on PLAYLISTS_FETCH_PLAYLISTS_BEGIN actions
export function* doFetchPlaylists(params) {
  let url = BaseApiUrl + '?cmd=fetchPlaylists' +
            '&sampleParam=' + encodeURI(params.sampleParam);

  let res;
  try {
    //simulator - start
    if (SimulatorMode) {
      yield call(delay, 1000);
      res = simulateFetchPlaylists(params.sampleParam);
    } else 
    //simulator - end
    {
      res = yield call(axios.get, url);
      res = res.request.responseText;
    }

    res = JSON.parse(res);
  } catch (err) {
    yield put({
      type: PLAYLISTS_FETCH_PLAYLISTS_FAILURE,
      data: { error: err },
    });
    return;
  }
  // Dispatch success action out of try/catch so that render errors are not catched.
  yield put({
    type: PLAYLISTS_FETCH_PLAYLISTS_SUCCESS,
    data: res,
  });
}

/*
  Alternatively you may use takeEvery.

  takeLatest does not allow concurrent requests. If an action gets
  dispatched while another is already pending, that pending one is cancelled
  and only the latest one will be run.
*/
export function* watchFetchPlaylists() {
  yield takeLatest(PLAYLISTS_FETCH_PLAYLISTS_BEGIN, doFetchPlaylists);
}

// Redux reducer - please keep reducer pure (i.e. don't use callback or operations that create side effects)
export function reducer(state, action) {
  switch (action.type) {
    case PLAYLISTS_FETCH_PLAYLISTS_BEGIN:
      return {
        ...state,
        fetchPlaylistsPending: true,
        fetchPlaylistsError: null,
      };

    case PLAYLISTS_FETCH_PLAYLISTS_SUCCESS:
      if (action.data.error && action.data.error !== '') // business logic error from server
        return {
          ...state,
          fetchPlaylistsPending: false,
          fetchPlaylistsError: action.data.error
        };

      return {
        ...state,
        samplePlaylists: action.data,
        fetchPlaylistsPending: false,
        fetchPlaylistsError: null,
      };

    case PLAYLISTS_FETCH_PLAYLISTS_FAILURE:
      return {
        ...state,
        fetchPlaylistsPending: false,
        fetchPlaylistsError: action.data.error,
      };

    case PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR:
      return {
        ...state,
        fetchPlaylistsError: null,
      };

    default:
      return state;
  }
}
