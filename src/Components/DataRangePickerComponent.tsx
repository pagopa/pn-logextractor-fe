import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CalendarPickerView } from '@mui/lab';
import { useState } from 'react';
import moment from 'moment';
import { Grid } from '@mui/material';

/**
 * @typedef {Object} DatePicker
 */
type DatePicker = {
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
}

/**
 * @typedef {Object} Props
 */
type Props = {
    /**
     * the two dates information 
     */
    datePickers: Array<DatePicker>,
    /**
     * function handling the change of the field 
     */
    onChange: any
    /**
     * the limit of the difference between the start date and the end date
     */
    intervalLimit?: Array<Number | string>
}

/**
 * Component representing a interaval dates picker 
 * @component
 */
const DateRangePickerComponent = (props: Props) => {

    /**
     * the two dates information 
     */
    const [dates, setDates] = useState(props.datePickers);

    /**
     * handle the change of some of the date fields
     * @param value  the selected date 
     * @param field which field is changed
     */
    const handleChange = (value: any, field:string) => {
        value = moment(value).format("YYYY-MM-DD")
        let prevState = [...dates];
        switch (field) {
            case "start":
                prevState[0] = {...prevState[0], value: value};
                setDates(prevState)
                break;
            case "end":
                prevState[1] = {...prevState[1], value: value};
                setDates(prevState)
                break;
        }
        props.onChange([prevState[0].value, prevState[1].value]);
    }

    return(
        <Grid item container direction="row" spacing={2}>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    views={dates[0].view}
                    key={dates[0].label}
                    label={dates[0].label}
                    value={dates[0].value}
                    onChange={e => handleChange(e, "start")}
                    disableFuture
                    inputFormat="yyyy-MM-dd"
                    mask={"____-__-__"} 
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Grid>
           <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                views={dates[1].view}
                key={dates[1].label}
                label={dates[1].label}
                value={dates[1].value}
                onChange={e => handleChange(e, "end")}
                inputFormat="yyyy-MM-dd"
                mask={"____-__-__"} 
                disableFuture
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
           </Grid>  
        </Grid>  
        
      
          
    )
}

export default DateRangePickerComponent;

