import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { styled } from '@mui/material/styles';
import ReactHowler from 'react-howler';
import raf from 'raf';
import { getVolume, getSeek, getPlayingMusicInfo } from '../reducks/player/selectors';
import { State } from '../reducks/store/initialState';
import { fetchSeek, fetchVolume } from '../reducks/player/operations';

const PositionSlider = styled(Slider)({
  color: '#9C45FF',
  width: '45vw',
  height: '3px',
  margin: '0 10px',
  '& .MuiSlider-rail': {
    color: '#B8B8B8',
    opacity: 1,
  },
  '& .MuiSlider-track': {
    border: 'none',
    transition: 'none',
  },
  '& .MuiSlider-thumb': {
    width: 10,
    height: 10,
    backgroundColor: '#9C45FF',
    transition: 'none',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
    },
  },
});

const VolumeSlider = styled(Slider)({
  color: '#9C45FF',
  width: '100px',
  height: '3px',
  marginLeft: '17px',
  '& .MuiSlider-rail': {
    color: '#B8B8B8',
    opacity: 1,
  },
  '& .MuiSlider-track': {
    border: 'none',
    transition: 'none',
  },
  '& .MuiSlider-thumb': {
    width: 0,
    height: 0,
    backgroundColor: '#9C45FF',
    transition: 'none',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
    },
  },
});

const Player = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [cover, setCover] = useState('');
  const [src, setSrc] = useState('');

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(0);
  const [seek, setSeek] = useState(0.0);
  const [duration, setDuration] = useState(0.0);

  const playerRef = useRef<ReactHowler>(null);
  const rafRef = useRef<number>();
  const isLoadedRef = useRef<boolean>(false);
  const isSeekingRef = useRef<boolean>(false);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`;
  }

  useEffect(() => {
    (async () => {
      setVolume(getVolume(selector));

      const playingMusicId = getPlayingMusicInfo(selector);
      const musicInfo = await window.sqlite.findSong(playingMusicId);
      setTitle(musicInfo.title);
      setArtist(musicInfo.artist.name);
      setSrc(musicInfo.filePath);
      setCover(musicInfo.album.cover);
      setDuration(musicInfo.duration);
      setSeek(getSeek(selector));
    })();
  }, [selector.player.id]);

  const handleToggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const handleOnLoad = useCallback(() => {
    isLoadedRef.current = true;
    playerRef.current?.seek(getSeek(selector));
  }, [selector.player.id]);

  const handleOnPlay = useCallback(() => {
    setIsPlaying(true);
  }, [isPlaying]);

  const handleOnEnd = useCallback(() => {
    setIsPlaying(false);
    clearRAF();
  }, [isPlaying]);

  const handleLoopToggle = useCallback(() => {
    setIsLoop(!isLoop);
  }, [isLoop]);

  const handleMuteToggle = useCallback(() => {
    setIsMute(!isMute);
  }, [isMute]);

  const handleMouseDownSeek = useCallback(() => {
    isSeekingRef.current = true;
  }, []);

  const handleMouseUpSeek = useCallback((value) => {
    isSeekingRef.current = false;
    playerRef.current?.seek(parseFloat(value));
    rafRef.current = raf(renderSeekPos);
  }, []);

  const handleSeekingChange = useCallback(
    (value) => {
      setSeek(parseFloat(value));
    },
    [seek]
  );

  const renderSeekPos = () => {
    if (!isSeekingRef.current) {
      if (isLoadedRef.current) {
        setSeek(playerRef.current?.seek() as number);
        dispatch(fetchSeek(playerRef.current?.seek() as number));
      } else {
        setSeek(getSeek(selector));
      }
    }
    if (isPlaying) {
      rafRef.current = raf(renderSeekPos);
    }
  };

  useEffect(() => {
    rafRef.current = raf(renderSeekPos);
    return () => {
      if (rafRef.current) {
        clearRAF();
      }
    };
  }, [renderSeekPos]);

  const clearRAF = () => {
    raf.cancel(rafRef.current as number);
  };

  return (
    <div className="player">
      {src && (
        <ReactHowler
          src={src}
          playing={isPlaying}
          onLoad={handleOnLoad}
          onPlay={handleOnPlay}
          onEnd={handleOnEnd}
          loop={isLoop}
          mute={isMute}
          volume={volume}
          ref={playerRef}
        />
      )}
      <Grid container sx={{ margin: 0, width: '100%' }}>
        <Grid item xs={3}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '24px',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <img style={{ width: 'auto', maxHeight: '62px' }} src={cover} alt="ジャケットイラスト" />
            <Box sx={{ marginLeft: '15px', width: '100%', position: 'absolute', left: '63px' }}>
              <Typography
                component="h2"
                noWrap={true}
                sx={{ fontSize: '14px', color: '#FFFFFF', marginBottom: '5px', width: '60%' }}
              >
                {title}
              </Typography>
              <Typography
                component="h3"
                noWrap={true}
                sx={{ fontSize: '12px', color: '#B8B8B8', lineHeight: 1, width: '60%' }}
              >
                {artist}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Stack>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 auto', '& > button': { margin: '0 4px' } }}>
                <IconButton disableRipple={true} sx={{ color: '#B8B8B8' }}>
                  <ShuffleIcon />
                </IconButton>
                <IconButton disableRipple={true} sx={{ color: '#B8B8B8' }}>
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleToggle();
                  }}
                  disableRipple={true}
                  sx={{
                    color: '#FFFFFF',
                    '&.MuiIconButton-root:active': {
                      transform: 'scale(0.9)',
                    },
                  }}
                >
                  {isPlaying ? (
                    <PauseCircleIcon sx={{ width: '35px', height: '35px' }} />
                  ) : (
                    <PlayCircleIcon sx={{ width: '35px', height: '35px' }} />
                  )}
                </IconButton>
                <IconButton disableRipple={true} sx={{ color: '#B8B8B8' }}>
                  <SkipNextIcon />
                </IconButton>
                <IconButton disableRipple={true} sx={{ color: '#B8B8B8' }}>
                  <RepeatIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', margin: '0 auto', marginTop: '-9px', height: '100%' }}>
                <Typography component="p" sx={{ fontSize: '12px', color: '#B8B8B8' }}>
                  {formatDuration(seek)}
                </Typography>
                <PositionSlider
                  aria-label="time-indicator"
                  value={seek}
                  min={0}
                  step={1}
                  max={240}
                  onChange={(_, value) => handleSeekingChange(value as number)}
                  onMouseDown={handleMouseDownSeek}
                  onChangeCommitted={(_, value) => handleMouseUpSeek(value as number)}
                />
                <Typography component="p" sx={{ fontSize: '12px', color: '#B8B8B8' }}>
                  {formatDuration(duration)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ margin: '0 42px 0 auto', display: 'flex', alignItems: 'center' }}>
              <IconButton
                disableRipple={true}
                sx={{
                  color: '#FFFFFF',
                }}
              >
                <VolumeUpIcon />
              </IconButton>
              <VolumeSlider
                aria-label="Volume"
                min={0}
                step={0.05}
                max={1}
                value={volume}
                onChange={(_, value) => {
                  setVolume(value as number);
                  dispatch(fetchVolume(value as number));
                }}
              />
              <IconButton
                disableRipple={true}
                sx={{
                  color: '#B8B8B8',
                  marginLeft: '24px',
                }}
              >
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Player;
