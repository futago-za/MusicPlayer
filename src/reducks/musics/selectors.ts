import { createSelector } from 'reselect';
import { State } from '../store/initialState';

const musicsSelector = (state: State) => state.musics;

export const getNewAddedSongsList = createSelector([musicsSelector], (state) => state.newAddedSongs);
