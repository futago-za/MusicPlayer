import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ArtistIcon from '@mui/icons-material/Person';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import GenreIcon from '@mui/icons-material/LibraryMusic';
import PlayListIcon from '@mui/icons-material/QueueMusic';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const List = styled('nav')({
  width: '100%',
  margin: '30px 0 9px',
});

const ListHeader = styled('h1')({
  backgroundColor: '#2F2F2F',
  color: '#FFFFFF',
  fontSize: '14px',
  margin: '0 0 5px 15px',
  paddingLeft: '9px',
  lineHeight: 1,
  fontWeight: 'bold',
});

const Sidebar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="sidebar">
      <List>
        <ListHeader>ライブラリ</ListHeader>
        <ListItemButton
          sx={{ padding: '0px' }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <Link to="/" style={{ display: 'flex', width: '100%', textDecoration: 'none', padding: '10px 15px' }}>
            <ListItemIcon>
              <HomeIcon sx={{ color: '#B8B8B8' }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              sx={{ margin: 0, marginLeft: '-9px' }}
              primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>ホーム</Typography>}
            />
          </Link>
        </ListItemButton>
        <ListItemButton
          sx={{ padding: '0px' }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <Link to="/artist" style={{ display: 'flex', width: '100%', textDecoration: 'none', padding: '10px 15px' }}>
            <ListItemIcon>
              <ArtistIcon sx={{ color: '#B8B8B8' }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              sx={{ margin: 0, marginLeft: '-9px' }}
              primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>アーティスト</Typography>}
            />
          </Link>
        </ListItemButton>
        <ListItemButton
          sx={{ padding: '0px' }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <Link to="album" style={{ display: 'flex', width: '100%', textDecoration: 'none', padding: '10px 15px' }}>
            <ListItemIcon>
              <AlbumIcon sx={{ color: '#B8B8B8' }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              sx={{ margin: 0, marginLeft: '-9px' }}
              primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>アルバム</Typography>}
            />
          </Link>
        </ListItemButton>
        <ListItemButton
          sx={{ padding: '0px' }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <Link to="song" style={{ display: 'flex', width: '100%', textDecoration: 'none', padding: '10px 15px' }}>
            <ListItemIcon>
              <MusicNoteIcon sx={{ color: '#B8B8B8' }} />
            </ListItemIcon>
            <ListItemText
              disableTypography
              sx={{ margin: 0, marginLeft: '-9px' }}
              primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>曲</Typography>}
            />
          </Link>
        </ListItemButton>
        <ListItemButton
          sx={{ padding: '10px 15px' }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <GenreIcon sx={{ color: '#B8B8B8' }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            sx={{ margin: 0, marginLeft: '-9px' }}
            primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>ジャンル</Typography>}
          />
        </ListItemButton>
      </List>
      <Divider sx={{ borderColor: '#B8B8B8', margin: '9px auto', width: '87.5%' }} />
      <List className="list">
        <ListHeader>プレイリスト</ListHeader>
        <ListItemButton
          sx={{ padding: '10px 15px' }}
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <PlayListIcon sx={{ color: '#B8B8B8' }} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            sx={{ margin: 0, marginLeft: '-9px' }}
            primary={<Typography sx={{ color: '#B8B8B8', fontSize: '14px' }}>テレビ楽曲</Typography>}
          />
        </ListItemButton>
      </List>
    </div>
  );
};

export default Sidebar;
