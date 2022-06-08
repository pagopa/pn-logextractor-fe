import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoMessages } from "../helpers/messagesConstants"

/**
 * General component presenting the header of the app.
 */
const Header = () => {
  
  /**
  * the state of the confirmation modal
  */
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  /**
  * Function closing the confirmation modal
  */
  const handleCloseModal = () => {
    setOpen(false);
  };

  /**
  * Function opening the confirmation modal after the log out button is click
  */
  const handleOpenModal = () => {
    setOpen(true);
  }

  /**
  * Function handling the logging out
  */
  const handleLogOut = () => {
    navigate("/");
  }

  return(
    <AppBar position="static">
        <Toolbar style={{display:'flex', justifyContent:"right"}}>
          <Tooltip title="Log out">
            <IconButton 
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenModal}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
         </Toolbar>
          <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
            LOG OUT
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {infoMessages.LOGOUT_CONFIRMATION}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Annulla</Button>
            <Button onClick={handleLogOut} autoFocus>
              Esci
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
  )
}

export default Header;