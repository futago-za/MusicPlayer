import { fetchVolumeAction, fetchSeekAction, fetchDurationAction, fetchPlayingMusicInfoAction } from './actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/store';

export const fetchVolume = (volume: number) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const player = state.player;
    dispatch(fetchVolumeAction({ ...player, volume }));
  };
};

export const fetchSeek = (seek: number) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const player = state.player;
    dispatch(fetchSeekAction({ ...player, seek }));
  };
};

export const fetchPlayingMusicInfo = (id: number) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const state = getState();
    const player = state.player;
    dispatch(fetchPlayingMusicInfoAction({ ...player, seek: 0.0, id }));
  };
};
