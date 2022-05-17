import { Fragment } from "react";
import TextFieldComponent from "./TextFieldComponent"
import RadioButtonsGroup from "./RadioButtonsGroup";
import Select from "@mui/material/Select";
import { FormControl, Grid, InputLabel, MenuItem } from "@mui/material";


/**
 * Items for the Tipo Estrazione and their coresponding fields
 */
let MenuItems: {[key: string]: Array<string>} = {
    "Ottieni EncCF": ["Ticket Number", "Codice Fiscale", "Person Radio Buttons"],
    "Ottieni CF": ["Unique Identifier", "Person Radio Buttons"],
    "Ottieni notifica": ["Ticket Number","IUN"],
    "Ottieni notifiche di una PA": ["Ticket Number", "IPA Code", "Month"],
    "Ottieni log completi + organizzazione": ["Ticket Number", "Codice Fiscale", "Time interval"],
    "Ottieni log completi": ["Ticket Number", "Codice Fiscale", "IUN", "Unique Identifier", "Time interval", "Activity Path Radio Buttons"] ,
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
     *if the field is required
     */
    required: boolean,
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
    options?: string[]
}

/**
 * array containing all fields of the app and their neccessary properties
 */
let FieldsProperties: {[key: string]: FieldsProps} = {
    "Tipo Estrazione": {
        name: "Tipo Estrazione",
        componentType: "select",
        label: "Tipo Estrazione",
        required: true,
        hidden: false,
        selectItems: Object.keys(MenuItems)
    },
    "Ticket Number": {
            name: "Ticket Number",
            componentType: "textfield",
            label: "Numero Ticket",
            required: true,
            hidden: false
    },
    "Codice Fiscale": {
            name: "Codice Fiscale",
            componentType: "textfield",
            label: "Codice Fiscale",
            required: true,
            hidden: false
    },
    "Unique Identifier": {
            name: "Unique Identifier",
            componentType: "textfield",
            label: "Codice Univoco",
            required: true,
            hidden: false
    },
    "IUN": {
            name: "IUN",
            componentType: "textfield",
            label: "IUN",
            required: true,
            hidden: false
    },
    "IPA Code": {
            name: "IPA Code",
            componentType: "textfield",
            label: "IPA Code",
            required: true,
            hidden: false
    },
    "Month": {
            name: "Month",
            componentType: "select",
            label: "Mese",
            required: true,
            selectItems: Array.from({length: 12}, (_, i) => (i + 1).toString()),
            hidden: false
    },
    "Time interval": {
            name: "Time interval",
            componentType: "select",
            label: "Intervallo temporale (mesi)",
            required: true,
            selectItems: Array.from({length: 3}, (_, i) => (i + 1).toString()),
            hidden: false
    },
    "Person Radio Buttons": {
        name: "Person Radio Buttons",
        componentType: "radioButtons",
        label: "Tipo personale",
        required: true,
        hidden: false,
        options: ["Natural person", "Legal person"]
    },
    "Activity Path Radio Buttons": {
        name: "Activity Path Radio Buttons",
        componentType: "radioButtons",
        label: "Activity Path",
        required: true,
        hidden: false,
        options: ["Anonymized activity path", "Non-anonymized activity path"]
    }
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
    const {componentType, label, required, selectItems}: FieldsProps = field;
    return <Grid item>
        {
            componentType == "textfield" && 
                <TextFieldComponent value={value} onChange={onChange} key={label} label={label} required={required}/>
        }
        {
            componentType == "select" &&
            <Fragment>
                <FormControl sx={{ minWidth: 180 }} >
                    <InputLabel id={label}>{label}</InputLabel>
                    <Select
                        key={label}
                        labelId={label}
                        id={label}
                        label={label}
                        onChange={onChange}
                        value={value}
                    >
                        {
                            label != "Tipo Estrazione" &&
                            <MenuItem key="none" value=""></MenuItem>
                        }
                        {selectItems?.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                </FormControl>
            </Fragment>
        }
        {
            componentType == "radioButtons" &&
            <RadioButtonsGroup field={field} onChange={onChange}></RadioButtonsGroup>
        }
    </Grid>
 }


export { MenuItems, FormField, FieldsProperties };    
export type { FieldsProps };

