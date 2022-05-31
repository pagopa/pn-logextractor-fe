import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/lab';
import moment from 'moment';

/**
 * @typedef {Object} Props
 */
type Props = {
  /**
   * label of the field
   */
  label: string,
  /**
   * calendar type
   */
  view: CalendarPickerView[],
  /**
     * value of the field if there is any
  */
  value: string,
  /**
  * function handling the change of the field 
  */
  onChange: any,
  /**
   *the format which the date to be shown and saved
   */
  format: string
  
}

/**
 * Component representing a date picker 
 * @component
 */
const DatePickerComponent = (props: Props) => {

  /**
   * handle change of the date field
   * @param e the selected date
   */
  const handleChange = (e: any) => {
      e =  moment(e).format(props.format.toUpperCase())
      props.onChange(e);
  }

    return(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={props.view}
          key={props.label}
          label={props.label}
          value={props.value}
          onChange={e => handleChange(e)}
          disableFuture
          inputFormat={props.format}
          mask={"____-__-__"} 
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    )
}

export default DatePickerComponent;

