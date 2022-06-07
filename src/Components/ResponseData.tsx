import { Typography } from '@mui/material';
import { opened, responseData } from "../redux/responseSlice";
import { useSelector } from 'react-redux';

/** 
 * connecting the response type with specific message
 * @enum 
 * @readonly
 * @type {string} 
 */
enum ResponseType {
    password = "Password",
    taxId = "Codice Fiscale",
    internalId = "ID"
}

/**
 * General component presenting the response data in the app: password or code.
 * @component
 * @param {Props} props
 */
const ResponseData = () => {

  const openedResponseData = useSelector(opened);

  const response = useSelector(responseData);

  return (
    openedResponseData ?
      <Typography align="center">
        <>
          {ResponseType[Object.keys(response)[0] as keyof typeof ResponseType]} : {Object.values(response)[0]}
        </>
      </Typography>
      : null
    )
}

export default ResponseData;