import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import nock from 'nock';
import { expect } from 'chai';

import {
  PLAYLISTS_FETCH_PLAYLISTS_BEGIN,
  PLAYLISTS_FETCH_PLAYLISTS_SUCCESS,
  PLAYLISTS_FETCH_PLAYLISTS_FAILURE,
  PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR,
} from 'src/features/playlists/redux/constants';

import {
  fetchPlaylists,
  dismissFetchPlaylistsError,
  doFetchPlaylists,
  reducer,
} from 'src/features/playlists/redux/fetchPlaylists';

describe('playlists/redux/fetchPlaylists', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // redux action tests
  it('correct action by fetchPlaylists', () => {
    expect(fetchPlaylists()).to.have.property('type', PLAYLISTS_FETCH_PLAYLISTS_BEGIN);
  });

  it('returns correct action by dismissFetchPlaylistsError', () => {
    expect(dismissFetchPlaylistsError()).to.have.property('type', PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR);
  });

  // saga tests
  const generator = doFetchPlaylists();

  it('calls delay when receives a begin action', () => {
    // Delay is just a sample, this should be replaced by real sync request.
    expect(generator.next().value).to.deep.equal(call(delay, 20));
  });

  it('dispatches PLAYLISTS_FETCH_PLAYLISTS_SUCCESS action when succeeded', () => {
    expect(generator.next('something').value).to.deep.equal(put({
      type: PLAYLISTS_FETCH_PLAYLISTS_SUCCESS,
      data: 'something',
    }));
  });

  it('dispatches PLAYLISTS_FETCH_PLAYLISTS_FAILURE action when failed', () => {
    const generatorForError = doFetchPlaylists();
    generatorForError.next(); // call delay(20)
    const err = new Error('errored');
    expect(generatorForError.throw(err).value).to.deep.equal(put({
      type: PLAYLISTS_FETCH_PLAYLISTS_FAILURE,
      data: { error: err },
    }));
  });

  it('returns done when finished', () => {
    expect(generator.next()).to.deep.equal({ done: true, value: undefined });
  });

  // reducer tests
  it('handles action type PLAYLISTS_FETCH_PLAYLISTS_BEGIN correctly', () => {
    const prevState = { fetchPlaylistsPending: false };
    const state = reducer(
      prevState,
      { type: PLAYLISTS_FETCH_PLAYLISTS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchPlaylistsPending).to.be.true;
  });

  it('handles action type PLAYLISTS_FETCH_PLAYLISTS_SUCCESS correctly', () => {
    const prevState = { fetchPlaylistsPending: true };
    const state = reducer(
      prevState,
      { type: PLAYLISTS_FETCH_PLAYLISTS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchPlaylistsPending).to.be.false;
  });

  it('handles action type PLAYLISTS_FETCH_PLAYLISTS_FAILURE correctly', () => {
    const prevState = { fetchPlaylistsPending: true };
    const state = reducer(
      prevState,
      { type: PLAYLISTS_FETCH_PLAYLISTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchPlaylistsPending).to.be.false;
    expect(state.fetchPlaylistsError).to.exist;
  });

  it('handles action type PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchPlaylistsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PLAYLISTS_FETCH_PLAYLISTS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchPlaylistsError).to.be.null;
  });
});