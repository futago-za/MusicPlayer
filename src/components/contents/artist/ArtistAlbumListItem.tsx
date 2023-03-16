import React from 'react';
import Box from '@mui/material/Box';
import Typoegraphy from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch } from 'react-redux';
import { fetchPlayingMusicInfo, fetchSeek } from '../../../reducks/player/operations';

type SongInfoForArtist = {
  id: number;
  title: string;
  artist: number;
  trackNumber: number;
  filePath: string;
  duration: number;
};

export type AlbumInfoForArtist = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  songs: SongInfoForArtist[];
};

const ListItem = (props: { song: SongInfoForArtist; selectedIndex: number }) => {
  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(fetchSeek(0));
    dispatch(fetchPlayingMusicInfo(id));
  };

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box>
      <Divider sx={{ borderColor: '#B8B8B8' }} />
      <ListItemButton sx={{ padding: '12px 0' }} onClick={() => handleClick(props.song.id)}>
        <Typoegraphy sx={{ fontSize: '14px', color: '#FFFFFF', width: '30px' }}>{props.song.trackNumber}</Typoegraphy>
        <Box>
          <Typoegraphy sx={{ fontSize: '14px', color: '#FFFFFF' }}>{props.song.title}</Typoegraphy>
          {props.selectedIndex === 0 && (
            <Typoegraphy sx={{ fontSize: '12px', color: '#B8B8B8' }}>{props.song.artist}</Typoegraphy>
          )}
        </Box>
        <Typoegraphy sx={{ fontSize: '14px', color: '#FFFFFF', marginLeft: 'auto' }}>
          {formatDuration(props.song.duration)}
        </Typoegraphy>
      </ListItemButton>
    </Box>
  );
};

const ArtistAlbumListItem = (props: { album: AlbumInfoForArtist; selectedIndex: number }) => {
  return (
    <Box sx={{ display: 'flex', padding: '20px 0' }}>
      <Box sx={{ width: '180px', paddingRight: '25px' }}>
        <img
          src={props.album.cover}
          width="auto"
          height="155px"
          style={{ display: 'block', borderRadius: '5px', margin: '0 auto' }}
        />
      </Box>
      <Box sx={{ width: 'calc(100% - 180px)' }}>
        <Typoegraphy
          variant="h2"
          component="h2"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            letterSpacing: 1.2,
            marginBottom: '10px',
          }}
        >
          {props.album.title}
        </Typoegraphy>
        <List sx={{ padding: 0 }}>
          {props.album.songs &&
            props.album.songs.map((song, index) => {
              return <ListItem key={index} song={song} selectedIndex={props.selectedIndex} />;
            })}
        </List>
      </Box>
    </Box>
  );
};

export default ArtistAlbumListItem;
