import { FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import { FieldsProps } from "./FormFields";

/**
 * @typedef {Object} Props
 */
type Props = {
    /**
     * field properties 
     */
    field: FieldsProps
    /**
     * function handling the change of the field 
     */
    onChange: any,
}

/**
 * Generating group of radio buttons with specific properties
 * @component
 * @param {Props} props
 */
const RadioButtonsGroup = (props: Props) => {
    const {options, label, name} = props.field;

    return(
        <FormControl >
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={options![0]}
                name={name}
            >
                {
                    options!.map(option => (
                        <FormControlLabel key={option} onChange={props.onChange}  value={option} control={<Radio />} label={option} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    )
}

export default RadioButtonsGroup;