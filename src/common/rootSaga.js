import * as commonSagas from '../features/common/redux/sagas';
import * as homeSagas from '../features/home/redux/sagas';
import * as playlistsSagas from '../features/playlists/redux/sagas';
// This file is auto maintained by rekit-plugin-redux-saga,
// you usually don't need to manually edit it.

// NOTE: DO NOT chanage featureSagas declearation pattern, it's used by rekit-plugin-redux-saga.
const featureSagas = [
  commonSagas,
  homeSagas,
  playlistsSagas,
];

const sagas = featureSagas.reduce((prev, curr) => [
  ...prev,
  ...Object.keys(curr).map(k => curr[k]),
], [])
// a saga should be function, below filter avoids error if redux/sagas.js is empty;
.filter(s => typeof s === 'function');

function* rootSaga() {
  yield sagas.map(saga => saga());
}

export default rootSaga;
