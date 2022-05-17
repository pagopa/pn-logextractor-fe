import { TextField } from "@mui/material";

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * label used for the textfield
   */
  label: string,
  /**
   * if this textfield is required
   */
  required: boolean,
  /**
   * function for handling changes in this textfield
   */
  onChange?: any,
  /**
   * default value if there is any
   */
  value?: any,
}

/**
 * Common textfield component used for generating the app fields
 * @component
 * @param {Props} props
 */
const TextFieldComponent = (fieldData: Props) => {
    return(
         <TextField 
            key={fieldData.label} 
            id={fieldData.label} 
            label={fieldData.label}
            variant="outlined"
            value={fieldData.value}
            onChange={fieldData.onChange}
            required={fieldData.required} />
    )
}
export default TextFieldComponent;