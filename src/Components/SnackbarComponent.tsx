import { SyntheticEvent, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { updateSnackbacrOpened, opened, statusCode } from "../redux/snackbarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
/** 
 * connecting severity with the type of alert
 * @enum 
 * @readonly
 * @type {string} 
 */
enum Severity {
  "OK" = "success",
  "Bad Request" = "error",
  "Internal Server Error" = "error",
}

/** 
 * connecting the alert with specific message
 * @enum 
 * @readonly
 * @type {string} 
 */
enum SeverityMessage {
  "OK" = "Operazione completata con successo",
  "Bad Request" = "Informazioni non valide",
  "Internal Server Error" = "Errore durante l'elaborazione della richiesta",
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
const SnackbarComponent = () => {

    const [severity, setSeverity] = useState("")

    const snackbarOpened: boolean  = useSelector(opened);

    const status: any = useSelector(statusCode);

    const dispatch = useDispatch();

    /**
    * function handling the closing of the snackbar 
    * @param   {Event | SyntheticEvent<any, Event>} e the close event 
    * @param   {SnackbarCloseReason} reson the reason of closing
    */
    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason = "escapeKeyDown") => {
      if(reason != "clickaway"){
        dispatch(updateSnackbacrOpened(false))
      }
    }

    const getSeverity = () => {
      if(status){
        if(status >= 200 && status < 300){
        setSeverity("OK")
      }else if(status >= 400 && status < 500){
        setSeverity("Bad Request")
      }else{
        setSeverity("Internal Server Error");
      }
      }  
    }

    useEffect(() => getSeverity())

    return(
        <Snackbar open={snackbarOpened}
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
