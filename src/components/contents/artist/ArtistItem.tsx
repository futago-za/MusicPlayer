import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ArtistIcon from '@mui/icons-material/Person';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  background: {
    padding: '10px 15px',
    width: '100%',
    height: '50px',
    backgroundColor: '#454545',
    '&.Mui-selected': {
      backgroundColor: '#C4C4C4',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#C4C4C4',
    },
  },
});

export type ArtistInfo = {
  id: number;
  name: string;
};

const ArtistItem = (props: {
  artistInfo: ArtistInfo;
  selectedIndex: number;
  handleItem: (event: React.MouseEvent, index: number) => void;
}) => {
  const classes = useStyles();
  const isSelected = props.selectedIndex === props.artistInfo.id;
  return (
    <>
      <ListItemButton
        selected={isSelected}
        onClick={(event) => props.handleItem(event, props.artistInfo.id)}
        className={classes.background}
      >
        <ListItemIcon>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '50%',
              backgroundColor: isSelected ? '#575757' : '#C4C4C4',
              width: '30px',
              height: '30px',
            }}
          >
            <ArtistIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '20px',
                height: '20px',
                transform: 'translate(-50%, -50%)',
                color: '#FFFFFF',
              }}
            />
          </Box>
        </ListItemIcon>
        <ListItemText
          disableTypography
          sx={{ margin: 0, marginLeft: '-9px' }}
          primary={
            <Typography noWrap={true} sx={{ color: isSelected ? '575757' : '#B8B8B8', fontSize: '12px' }}>
              {props.artistInfo.name}
            </Typography>
          }
        />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default ArtistItem;
