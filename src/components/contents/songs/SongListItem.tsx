import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import PlayingIcon from '@mui/icons-material/BarChart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayingMusicInfo, fetchSeek } from '../../../reducks/player/operations';
import { State } from '../../../reducks/store/initialState';
import { getPlayingMusicInfo } from '../../../reducks/player/selectors';

export type SongInfo = {
  id: number;
  cover: string;
  title: string;
  album: string;
  artist: string;
  genre: string;
  duration: number;
};

const Cell = styled(Typography)({
  boxSizing: 'border-box',
  fontSize: '12px',
  color: '#FFFFFF',
  lineHeight: 1,
  padding: '10px 0'
});

function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.floor(value - minute * 60);
  return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
}

const SongListItem: React.FC<{songInfo: SongInfo }> = (props: {songInfo: SongInfo;}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);
  const [playingSongId, setPlayingSongId] = useState(0);
  useEffect(() => {
    const {id} = getPlayingMusicInfo(selector);
    setPlayingSongId(id);
  }, [selector.player.id])

  const handleClick = (id: number) => {
    dispatch(fetchSeek(0));
    dispatch(fetchPlayingMusicInfo(id));
  }

  return (
    <ListItemButton sx={{padding: '7px 0', height: '50px'}} onClick={() => handleClick(props.songInfo.id)}>
        <Box sx={{position: 'relative', width: '45%'}}>
          { 
            playingSongId === props.songInfo.id && (
            <ListItemIcon sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '9px'}}>
              <PlayingIcon sx={{ color: '#9C45FF'}}/>
            </ListItemIcon>
            )
          }
          <Box sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '40px', width: '43px'}}>
              <img src={props.songInfo.cover} style={{display: 'block', height: '43px', borderRadius: '3px', margin: '0 auto'}}/>
          </Box>
          <Box sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '95px', width: 'calc(100% - 95px)'}}>
              <Typography noWrap sx={{boxSizing: 'border-box', color:'#FFFFFF', fontSize: '12px', width: '100%', paddingRight: '20px'}}>{props.songInfo.title}</Typography>
              <Typography noWrap sx={{boxSizing: 'border-box', color:'#B8B8B8', fontSize: '12px', width: '100%', paddingRight: '20px'}}>{props.songInfo.artist}</Typography>
          </Box>
        </Box>
        <Cell noWrap sx={{width: '30%', paddingRight: '20px'}}>{props.songInfo.album}</Cell>
        <Cell noWrap sx={{width: '15%', paddingRight: '20px'}}>{props.songInfo.genre}</Cell>
        <Cell noWrap sx={{width: '10%', paddingRight: '20px'}}>{formatDuration(props.songInfo.duration)}</Cell>
    </ListItemButton>
  );
};

export default SongListItem;
