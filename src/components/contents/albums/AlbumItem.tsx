import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

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

export type AlbumInfo = {
  id: number;
  title: string;
  artist: string;
  cover: string;
};

const AlbumItem: React.FC<{ width: number; albumInfo: AlbumInfo }> = (props: {
  width: number;
  albumInfo: AlbumInfo;
}) => {
  const dispatch = useDispatch();

  //   const handleClick = (alubmInfo: AlbumInfo) => {
  //   }

  return (
    <Card
      sx={{
        width: String(props.width - 12) + 'px',
        backgroundColor: '#575757',
      }} /*onClick={() => handleClick(props.albumItem)}*/
    >
      <Box sx={{ padding: '12px 8px', width: '100%', height: `calc(${props.width}px - 12px + 8px)` }}>
        <CardMedia
          component="img"
          image={props.albumInfo.cover}
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
          {props.albumInfo.title}
        </TitleText>
        <ArtistText variant="body2" noWrap={true}>
          {props.albumInfo.artist}
        </ArtistText>
      </CardContent>
    </Card>
  );
};

export default AlbumItem;
