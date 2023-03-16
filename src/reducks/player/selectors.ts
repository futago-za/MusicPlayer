import { createSelector } from 'reselect';
import { State } from '../store/initialState';
import { Player } from './reducers';

const playerSelector = (state: State) => state.player;

export const getVolume = createSelector([playerSelector], (state) => state.volume);

export const getSeek = createSelector([playerSelector], (state) => state.seek);

export const getPlayingMusicInfo = createSelector([playerSelector], (state: Player) => ({
  id: state.id,
}));
