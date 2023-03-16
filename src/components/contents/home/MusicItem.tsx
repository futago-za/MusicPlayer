import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { fetchPlayingMusicInfo, fetchSeek } from '../../../reducks/player/operations';

const TitleText = styled(Typography)({
  fontSize: '60%',
  fontWeight: 'normal',
  color: '#FFFFFF',
});

const ArtistText = styled(Typography)({
  fontSize: '12px',
  fontWeight: 'normal',
  color: '#B8B8B8',
});

export type MusicInfo = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  filePath: string;
  duration: number;
};

const MusicItem: React.FC<{ width: number; musicInfo: MusicInfo }> = (props: {
  width: number;
  musicInfo: MusicInfo;
}) => {
  const dispatch = useDispatch();

  const handleClick = (musicInfo: MusicInfo) => {
    dispatch(fetchSeek(0));
    dispatch(fetchPlayingMusicInfo(musicInfo.id));
  };

  return (
    <Card
      sx={{ width: String(props.width - 12) + 'px', backgroundColor: '#575757' }}
      onClick={() => handleClick(props.musicInfo)}
    >
      <Box sx={{ padding: '12px 8px', width: '100%', height: `calc(${props.width}px - 12px + 8px)` }}>
        <CardMedia
          component="img"
          image={props.musicInfo.cover}
          alt="Cover Image"
          sx={{ margin: '0 auto', borderRadius: '5px', width: 'auto', maxHeight: '100%' }}
        />
      </Box>
      <CardContent
        sx={{
          padding: '0px 8px',
          marginTop: '-2px',
          '&.MuiCardContent-root': {
            paddingBottom: '12px',
          },
        }}
      >
        <TitleText gutterBottom variant="h5" noWrap={true} sx={{ fontSize: props.width * 0.07 }}>
          {props.musicInfo.title}
        </TitleText>
        <ArtistText variant="body2" noWrap={true}>
          {props.musicInfo.artist}
        </ArtistText>
      </CardContent>
    </Card>
  );
};

export default MusicItem;
