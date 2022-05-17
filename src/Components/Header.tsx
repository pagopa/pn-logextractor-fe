import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';

/**
 * General component presenting the header of the app.
 */
const Header = () => {
  
  /**
  * Function handling the log out button click
  */
  const handleLogOut = () => {
    console.log("log out");
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
            onClick={handleLogOut}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
         </Toolbar>
      </AppBar>
  )
}

export default Header;