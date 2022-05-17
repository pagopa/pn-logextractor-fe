import Box from '@mui/material/Box';
/** 
 * connecting the response type with specific message
 * @enum 
 * @readonly
 * @type {string} 
 */
enum ResponseType {
    password = "Password",
    codice = "Codice Univoco"
}

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * the type of the response string or password
   */
  type: string,
  /**
   * the value of the response
   */
  value: string
}

/**
 * General component presenting the response data in the app: password or code.
 * @component
 * @param {Props} props
 */
const ResponseData = ({type, value}: Props) => {
  return (
    <Box component="div" sx={{display: "flex", justifyContent: "center"}}>
          <p>{ResponseType[type as keyof typeof ResponseType]}: {value}</p>
    </Box>
    );
}

export default ResponseData;