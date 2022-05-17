import { SyntheticEvent, useState } from "react";
import Alert from '@mui/material/Alert';
import type { Color } from '@material-ui/lab/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
  * The type of the alert
  */
  severity: string 
}

/** 
 * connecting severity with the type of alert
 * @enum 
 * @readonly
 * @type {string} 
 */
enum Severity {
  success = "success",
  errorData = "error",
  error = "error"
}

/** 
 * connecting the alert with specific message
 * @enum 
 * @readonly
 * @type {string} 
 */
enum SeverityMessage {
  success = "Operazione completata con successo",
  errorData = "Informazioni non valide",
  error = "Errore durante l'elaborazione della richiesta",
}

/** 
 * Styles of the component 
*/
const styles = {
  position: "static", 
  transform: "none !important", 
  "WebkitTransform": "none !important", 
  paddingBottom: "20px" 
}

/**
 * General component presenting snackbar for alerts in the app.
 * @component
 * @param {Props} props
 */
const SnackbarComponent = ({severity}: Props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(true);

    /**
    * function handling the closing of the snackbar 
    * @param   {Event | SyntheticEvent<any, Event>} e the close event 
    * @param   {SnackbarCloseReason} reson the reason of closing
    */
    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason = "escapeKeyDown") => {
      if(reason != "clickaway"){
        setSnackbarOpen(false);
      }
  }

    return(
        <Snackbar open={snackbarOpen}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={styles}
                onClose={(e: Event | SyntheticEvent<any, Event>, r: SnackbarCloseReason) => handleClose(e, r)}
                >
        <Alert onClose={handleClose}
           variant="filled" severity={Severity[severity as keyof typeof Severity]}
        >
          {SeverityMessage[severity as keyof typeof Severity]}
        </Alert>
      </Snackbar>
    )
}

export default SnackbarComponent;
