import React, { DragEvent } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Player from './components/Player';
import Contents from './components/contents/home/Contents';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewAddedSongs } from './reducks/musics/operations';
import { State } from './reducks/store/initialState';
import { getNewAddedSongsList } from './reducks/musics/selectors';
import AlbumList from './components/contents/albums/AlbumList';
import ArtistContents from './components/contents/artist/ArtistContent';
import SongList from './components/contents/songs/SongList';

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#575757',
            ':hover': {
              backgroundColor: '#575757',
            },
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);

  const dragOver = (event: DragEvent) => {
    event.preventDefault();
  };
  const dragLeave = (event: DragEvent) => event.preventDefault();
  const dragEnd = (event: DragEvent) => event.preventDefault();

  const drop = (event: DragEvent) => {
    (async () => {
      event.preventDefault();
      const file = event.dataTransfer.files;
      const result = await window.sqlite.create(file[0].path);
      const newAddedSongs = getNewAddedSongsList(selector);
      if (newAddedSongs.length > 28) {
        newAddedSongs.pop();
      }
      newAddedSongs.unshift(result[0].id);
      console.log(newAddedSongs)
      dispatch(fetchNewAddedSongs(newAddedSongs));
    })();
  };

  return (
    <HashRouter>
      <div onDragOver={dragOver} onDragLeave={dragLeave} onDragEnd={dragEnd} onDrop={drop}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div className="wrapper-row">
            <Sidebar />
            <div className="wrapper-column">
              <Header />
              <Switch>
                <Route exact path="/" component={Contents} />
                <Route exact path="/artist" component={ArtistContents} />
                <Route exact path="/album" component={AlbumList} />
                <Route exact path="/song" component={SongList} />
              </Switch>
            </div>
          </div>
          <Player />
        </ThemeProvider>
      </div>
    </HashRouter>
  );
};

export default App;
