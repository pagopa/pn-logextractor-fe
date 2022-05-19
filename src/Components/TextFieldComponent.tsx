import { TextField } from "@mui/material";
import { FieldsProps } from "./FormFields";

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * field properties 
   */
  field: FieldsProps,
  /**
   * function for handling changes in this textfield
   */
  onChange?: any,
}

/**
 * Common textfield component used for generating the app fields
 * @component
 * @param {Props} props
 */
const TextFieldComponent = (props: Props) => {
  const field = props.field
    return(
         <TextField 
            fullWidth
            type={field.type}
            hidden={field.hidden!}
            id={field.label} 
            label={field.label}
            variant="outlined"
            onChange={props.onChange}
            required={field.required} />
    )
}
export default TextFieldComponent;