import TextFieldComponent from "./TextFieldComponent"
import RadioButtonsGroup from "./RadioButtonsGroup";
import { Checkbox, FormControlLabel, Grid} from "@mui/material";
import SelectField from "./SelectField";
import { regex } from "../helpers/validations";
import DatePickerComponent from "./DatePickerComponent";
import DateRangePickerComponent from "./DataRangePickerComponent";
import moment from "moment";
import { CalendarPickerView } from "@mui/lab";
import { errorMessages } from "../helpers/messagesConstants"

/**
 * Items for the Tipo Estrazione and their coresponding fields
 */
let MenuItems: {[key: string]: Array<string>} = {
    "Ottieni EncCF": ["ticketNumber", "taxId", "recipientType"],
    "Ottieni CF": ["personId", "recipientType"],
    "Ottieni notifica": ["ticketNumber","iun"],
    "Ottieni notifiche di una PA": ["ticketNumber", "ipaCode", "referenceMonth"],
    // use case 9 dissabled for now
    // "Ottieni log completi + organizzazione": ["ticketNumber", "taxId", "Time interval"],
    "Ottieni log completi": ["ticketNumber", "taxId", "iun", "personId", "Time interval", "deanonimization"],
    "Ottieni log di processo": ["traceId", "Time interval"]
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
            name: "ticketNumber",
            componentType: "textfield",
            label: "Numero Ticket",
            hidden: false,
            rules: {
                pattern: {
                    value: regex.ALPHA_NUMERIC_WITHOUT_SPECIAL_CHAR_PATTERN,
                    message: errorMessages.INCORRECT
                },
                required: errorMessages.REQUIRED
            }
    },
    "Codice Fiscale": {
            name: "taxId",
            componentType: "textfield",
            label: "Codice Fiscale",
            hidden: false,
            rules: {
                pattern: {
                    value: regex.FISCAL_CODE_PATTERN,
                    message: errorMessages.INCORRECT
                },
                minLength: {
                    value: 16,
                    message: errorMessages.FISCAL_CODE_LENGTH
                },
                maxLength: {
                    value: 16,
                    message: errorMessages.FISCAL_CODE_LENGTH
                },
                required: errorMessages.REQUIRED
            }
    },
    "Unique Identifier": {
            name: "personId",
            componentType: "textfield",
            label: "Codice Univoco",
            hidden: false,
            rules: {
                pattern: {
                    value: regex.UNIQUE_IDENTIFIER_PATTERN,
                    message: errorMessages.INCORRECT
                },
                minLength: {
                    value: 1,
                    message: errorMessages.UNIQUES_IDENTIFIER_LENGTH
                },
                maxLength: {
                    value: 100,
                    message: errorMessages.UNIQUES_IDENTIFIER_LENGTH
                },
                required: errorMessages.REQUIRED
            }
    },
    "IUN": {
            name: "iun",
            componentType: "textfield",
            label: "IUN",
            hidden: false,
            rules: {
                required: errorMessages.REQUIRED
            }
    },
    "IPA Code": {
            name: "ipaCode",
            componentType: "textfield",
            label: "IPA Code",
            hidden: false,
            rules: {
                required: errorMessages.REQUIRED
            }
    },
    "Trace ID": {
        name: "traceId",
        componentType: "textfield",
        label: "Trace ID",
        hidden: false,
        rules: {
                required: errorMessages.REQUIRED
        }
    },
    "Month": {
            name: "referenceMonth",
            componentType: "datePicker",
            label: "Mese",
            hidden: false,
            rules: {
                required: errorMessages.REQUIRED,
                valueAsDate: {
                    value: true,
                    message: errorMessages.INCORRECT
                },
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
                required: errorMessages.REQUIRED,
                validate: {
                    validateInterval: (dates: Array<any>) => {
                        let startDate = moment(dates[0]);
                        let endDate = moment(dates[1]);
                        let interval = endDate.diff(startDate, "days");
                        return interval <= 91 || errorMessages.DATES_INTERVAL
                    },
                    checkDates: (dates: Array<any>) => {
                        let startDate = moment(dates[0]);
                        let endDate = moment(dates[1]);
                        return startDate.isBefore(endDate) || errorMessages.DATES_ORDER
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
            required: errorMessages.REQUIRED,
            valueAsDate: {
                value: true,
                message: errorMessages.INCORRECT
            },
        },
        view: ["day"],
        format: "yyyy-MM-dd"
    },
    "Person Radio Buttons": {
        name: "recipientType",
        componentType: "radioButtons",
        label: "Tipo personale",
        hidden: false,
        rules: {
            required: errorMessages.REQUIRED
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
        name: "deanonimization",
        componentType: "checkbox",
        label: "Deanonimizzazione dati",
        hidden: false,
    },
    "Email": {
        name: "email",
        componentType: "textfield",
        label: "Email",
        hidden: false,
        type: "email",
        rules: {
            required: errorMessages.REQUIRED
        },
    },
    "Password": {
        name: "password",
        componentType: "textfield",
        label: "Password",
        hidden: false,
        type: "password",
        rules: {
            required: errorMessages.REQUIRED
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

