import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { infoMessages } from "../helpers/messagesConstants"
import { Divider, Grid, Typography } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo_pagopa_bianco from "../resources/logo_pagopa_bianco.svg";
import {logout} from "../Authentication/auth"
import { resetStorage } from '../Authentication/storage';
import { useDispatch } from 'react-redux';
import * as spinnerActions from "../redux/spinnerSlice";
/**
 * General component presenting the header of the app.
 */
const Header = ({email}: any) => {

  /**
  * the state of the confirmation modal
  */
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

   /**
    * dispatch redux actions
    */
  const dispatch = useDispatch();

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
 /* istanbul ignore next */
  const handleLogOut = () => {
    setOpen(false);
    dispatch(spinnerActions.updateSpinnerOpened(true));
    logout()
      .then(() => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        navigate("/");
      })
      .catch((error: any) => {
        dispatch(spinnerActions.updateSpinnerOpened(false));
        throw error;
      })
    
  }

  return (
    <AppBar position="static" sx={{bgcolor:"#0066CC"}}>
      <Container>
        <Toolbar sx={{ paddingRight: "0px", paddingLeft: "0px", '@media (min-width: 640px)': { paddingRight: "0px", paddingLeft: "0px" } }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography>PagoPA S.p.A.</Typography>
            </Grid>
            <Grid item>
              <Grid container justifyContent='flex-end' alignItems="center">
                <AccountCircleIcon />
                <Typography>{email}</Typography>
                <Divider style={{ background: 'white' }}  orientation="vertical" variant="middle" flexItem />
                <Tooltip title="Log out">
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenModal}
                  >
                    <LogoutIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Grid>

            </Grid>
          </Grid>
        </Toolbar>
      </Container>
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
    </AppBar >
  )
}

export default Header;