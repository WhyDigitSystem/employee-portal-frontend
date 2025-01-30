// ReusableButton.js
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar, ButtonBase, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

const ActionButton = ({ title, icon: Icon, onClick, placement = 'top', margin = '10px', isLoading }) => {
  const theme = useTheme();
  const anchorRef = React.useRef(null);

  return (
    <Tooltip title={title} placement={placement}>
      <ButtonBase sx={{ borderRadius: '12px', marginRight: margin }} onClick={onClick} disabled={isLoading}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            transition: 'all .2s ease-in-out',
            background: 'white', // Set background to white
            color: 'black', // Set text/icon color to black
            '&[aria-controls="menu-list-grow"],&:hover': {
              background: 'lightgray', // Set hover background to light gray
              color: 'black', // Set hover icon/text color to black
            }
          }}
          ref={anchorRef}
          aria-haspopup="true"
          color="inherit"
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : <Icon size="1.3rem" stroke={1.5} />}
        </Avatar>
      </ButtonBase>
    </Tooltip>
  );
};

export default ActionButton;
