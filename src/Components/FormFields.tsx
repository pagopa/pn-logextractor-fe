import TextFieldComponent from "./TextFieldComponent"
import RadioButtonsGroup from "./RadioButtonsGroup";
import { Checkbox, FormControlLabel, Grid} from "@mui/material";
import SelectField from "./SelectField";
import { regex } from "./validations";
import DatePickerComponent from "./DatePickerComponent";
import DateRangePickerComponent from "./DataRangePickerComponent";
import moment from "moment";
import { CalendarPickerView } from "@mui/lab";


/**
 * Items for the Tipo Estrazione and their coresponding fields
 */
let MenuItems: {[key: string]: Array<string>} = {
    "Ottieni EncCF": ["Ticket Number", "Codice Fiscale", "Date Picker", "Person Radio Buttons"],
    "Ottieni CF": ["Unique Identifier", "Date Picker", "Person Radio Buttons"],
    "Ottieni notifica": ["Ticket Number","IUN", "Date Picker"],
    "Ottieni notifiche di una PA": ["Ticket Number", "IPA Code", "Month"],
    "Ottieni log completi + organizzazione": ["Ticket Number", "Codice Fiscale", "Time interval"],
    "Ottieni log completi": ["Ticket Number", "Codice Fiscale", "IUN", "Unique Identifier", "Time interval", "Deanonymization Checkbox"]
}

/**
 * @typedef {Object} FieldsProps
 */
type FieldsProps = {
    /**
     * the type of the component: "textfield" | "select" | "radioButtons" 
     */
    componentType: string, 
    /**
     * label to be shown with the field 
     */
    label: string,
    /**
     * items in case the component is select menu 
     */
    selectItems?: Array<string> ,
    /**
     * if the field is shown or hidden
     */
    hidden: boolean,
    /**
     * name of the component  
     */
    name: string,
    /**
     * options in case the component is redionButtons
     */
    options?: Array<{[key: string]: string}>,
    /**
     * the type of the text field
     */
    type?: string

    /**
     * validation rules
     */
    rules?: any,
    /**
     * if the component is a calendar, it is its type
     */
    view?: CalendarPickerView[],
    /**
     * the format of the date, if the component is a calendar
     */
    format?: string
}

/**
 * array containing all fields of the app and their neccessary properties
 */
let FieldsProperties: {[key: string]: FieldsProps} = {
    "Tipo Estrazione": {
        name: "Tipo Estrazione",
        componentType: "select",
        label: "Tipo Estrazione",
        hidden: false,
        selectItems: Object.keys(MenuItems)
    },
    "Ticket Number": {
            name: "Ticket Number",
            componentType: "textfield",
            label: "Numero Ticket",
            hidden: false,
            rules: {
                pattern: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
                required: "This field is required."
            }
    },
    "Codice Fiscale": {
            name: "Codice Fiscale",
            componentType: "textfield",
            label: "Codice Fiscale",
            hidden: false,
            rules: {
                pattern: regex.FISCAL_CODE_PATTERN,
                minLength: 16,
                maxLength: 16,
                required: "This field is required."
            }
    },
    "Unique Identifier": {
            name: "Unique Identifier",
            componentType: "textfield",
            label: "Codice Univoco",
            hidden: false,
            rules: {
                pattern: regex.UNIQUE_IDENTIFIER_PATTERN,
                minLength: 1,
                maxLength: 100,
                required: "This field is required."
            }
    },
    "IUN": {
            name: "IUN",
            componentType: "textfield",
            label: "IUN",
            hidden: false,
            rules: {
                required: "This field is required."
            }
    },
    "IPA Code": {
            name: "IPA Code",
            componentType: "textfield",
            label: "IPA Code",
            hidden: false,
            rules: {
                required: "This field is required."
            }
    },
    "Month": {
            name: "Month",
            componentType: "datePicker",
            label: "Mese",
            hidden: false,
            rules: {
                required: "This field is required.",
                valueAsDate: true,
            },
            view: ["month", "year"],
            type: "month",
            format: "yyyy-MM"
    },
    "Time interval": {
            name: "Time interval",
            componentType: "dateRangePicker",
            label: "Time interval",
            hidden: false,
            rules: {
                required: "This field is required.",
                validate: {
                    validateInterval: (dates: Array<any>) => {
                        let startDate = moment(dates[0].value);
                        let endDate = moment(dates[1].value);
                        let interval = endDate.diff(startDate, "days");
                        return interval <= 90 || "Time interval can't be more than 3 months."
                    },
                    checkDates: (dates: Array<any>) => {
                        let startDate = moment(dates[0].value);
                        let endDate = moment(dates[1].value);
                        return startDate.isBefore(endDate) || 
                            "Start date can't be after the end date"
                    }
                }
            }
    },
    "Date Picker": {
        name: "Date Picker",
        componentType: "datePicker",
        label: "Date",
        hidden: false,
        type: "date",
        rules: {
            required: "This field is required.",
            valueAsDate: true,
        },
        view: ["day"],
        format: "yyyy-MM-dd"
    },
    "Person Radio Buttons": {
        name: "Person Radio Buttons",
        componentType: "radioButtons",
        label: "Tipo personale",
        hidden: false,
        rules: {
            required: "This field is required."
        },
        options: [
            {
                option: "Persona Fisica",
                value: "PF"
            }, 
            {
                option: "Persona Giuridica",
                value: "PG"
            }]
    },
    "Deanonymization Checkbox": {
        name: "Deanonymization Checkbox",
        componentType: "checkbox",
        label: "Deanonimizzazione dati",
        hidden: false,
        rules: {
            required: "This field is required."
        },
    },
    "Email": {
        name: "email",
        componentType: "textfield",
        label: "Email",
        hidden: false,
        type: "email",
        rules: {
            required: "This field is required."
        },
    },
    "Password": {
        name: "password",
        componentType: "textfield",
        label: "Password",
        hidden: false,
        type: "password",
        rules: {
            required: "This field is required."
        },
    },
}

/**
 * @typedef {Object} Props
 */
type Props = {
    field: FieldsProps,
    onChange?: any,
    value?:any,
}

/**
 * Generating different components by specific properties
 * @component
 * @param {Props} props
 */
const FormField = ({ field, onChange, value }: Props) => { 
    const componentType : string = field.componentType;
    return <Grid item>
        {
            componentType == "textfield" && 
                <TextFieldComponent value={value} onChange={onChange} field={field} />
        }
        {
            componentType == "select" &&
                <SelectField value={value} field={field} onChange={onChange} />
        }
        {
            componentType == "radioButtons" &&
                <RadioButtonsGroup value={value} field={field} onChange={onChange}></RadioButtonsGroup>
        }
        {
            componentType == "checkbox" &&
                <FormControlLabel label={field.label} control={<Checkbox value={value} onChange={onChange}/>} />
        }
        {
            componentType == "datePicker" &&
                <DatePickerComponent format={field.format!} onChange={onChange} label={field.label} view={field.view!} value={value}/>
        }
        {
            componentType == "dateRangePicker" &&
                <DateRangePickerComponent onChange={onChange} intervalLimit={[3, "months"]}  datePickers={[
                    {
                        label: "Dal",
                        view:["day"],
                        value:value[0]
                    },
                    {
                        label: "Al",
                        view:["day"],
                        value:value[1]
                    }
                ]} />
        }
    </Grid>
 }


export { MenuItems, FormField, FieldsProperties };    
export type { FieldsProps };

