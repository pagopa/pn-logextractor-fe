import { Button, Container, FormHelperText, Grid } from "@mui/material";
import{ useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FieldsProperties, FieldsProps, FormField, MenuItems } from "./FormFields";
import moment from 'moment';

/**
 * default values of the form fields
 */
const defaultFormValues: {[key: string]: any } = {
    "Ticket Number": "",
    "Codice Fiscale": "",
    "Unique Identifier": "",
    "IUN": "",
    "IPA Code": "",
    "Month": moment().format("YYYY-MM"),
    "Tipo Estrazione": "Ottieni EncCF",
    "Person Radio Buttons": "PF",
    "Deanonymization Checkbox": false,
    "Date Picker": moment().format("YYYY-MM-DD"),
    "Time interval": [moment().subtract(3, 'months').format("YYYY-MM-DD"), moment(new Date).format("YYYY-MM-DD")]
}

/**
 * Generating the app form using the form fields
 * @component
 */
const SearchForm = () => {

    /**
     * selected value of Tipo Estrazione select menu
     */
    const [selectedValue, setSelectedValue] = useState<string>(Object.keys(MenuItems)[0]);
    
    /**
     * the fields coresponding to the selected value
     */
    const [fields, setFields]  = useState<FieldsProps[]>(Object.values(FieldsProperties));
    
    /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, watch, formState: { dirtyFields, errors }, reset, getValues} = useForm({
        mode: 'onChange',
        defaultValues: defaultFormValues
    });

    /**
    * used for watching all fields when changing 
    */
    const watchAllFields = useWatch({name: MenuItems[selectedValue], control});
    
    /**
    * used for watching Tipo Estrazione select menu 
    */
    const watchTipoEstrazione = useWatch({name: "Tipo Estrazione", control})


     /**
     * function handling changes of the Tipo Estrazione select menu
     * @param {SelectChangeEvent<string>} e the event of the field 
     */
    useEffect(() => {
        const values = getValues();
        setSelectedValue(values["Tipo Estrazione"].toString());
        setFields(filterFields(MenuItems[values["Tipo Estrazione"].toString()]));
        reset({...defaultFormValues, "Tipo Estrazione": values["Tipo Estrazione"]});
    }, [watchTipoEstrazione])

 
    /**
     * function handling the changes in the fields when the selected value of Tipo Estrazione is
     * "Ottieni log completi" so some fields are hidden and some are shown according
     * to which fields are filled 
     */
    useEffect(() => {
        let neededFields: string[] = []
        if(selectedValue === "Ottieni log completi"){
            if(Object.keys(dirtyFields).length == 0 || (Object.keys(dirtyFields).length == 1 && 
                ["Deanonymization Checkbox", "Ticket Number"].includes( Object.keys(dirtyFields)[0]))){
                neededFields = MenuItems["Ottieni log completi"].filter(item => item != "Deanonymization Checkbox");
            }else{
                if(Object.keys(dirtyFields).includes("Time interval")){
                    neededFields = ["Ticket Number", "Codice Fiscale", "Time interval", "Unique Identifier"];
                }
                if(Object.keys(dirtyFields).includes("Codice Fiscale")){
                    neededFields = ["Ticket Number", "Codice Fiscale", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("Unique Identifier")){
                    neededFields = ["Ticket Number", "Unique Identifier", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("IUN")){
                    neededFields = ["Ticket Number", "IUN", "Deanonymization Checkbox"];
                }           
            }
            setFields(filterFields(neededFields));
        }
    }, [watchAllFields])


    /**
     * 
     * @param {string[]} neededFields needed fields in the situation just as names 
     * @returns {FieldsProps[]} needed fields with their specific properties ready for creating 
     */
    const filterFields = (neededFields:string[]): FieldsProps[] => {
        const allFields = Object.values(FieldsProperties);
        return allFields.map(field => (neededFields.includes(field.name) || field.name == "Tipo Estrazione" ?
                    field : { ...field, hidden: true }));
    }

    return(
        <Container>
            <Grid container direction="column" rowSpacing={4} sx={{border: "2px black dotted", padding: "5%"}}>
                <form onSubmit={handleSubmit(data => console.log(data))}>
                        <Grid container item direction="column" rowSpacing={5}>
                            <Grid item container direction="row" spacing={2} alignItems="center">
                                {
                                    fields.map(field => {
                                        return (
                                            !field.hidden &&
                                            <Grid item key={field.name + "Item"}>
                                                <Controller
                                                control={control}
                                                name={field.name}
                                                rules={field.rules}
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => {
                                                    return(
                                                        <>
                                                            <FormField field={field} onChange={onChange} value={value}/> 
                                                            <FormHelperText error>{errors[field.name] ? 
                                                                errors[field.name].message ? errors[field.name].message : "Incorrect value!"
                                                                :  " "}</FormHelperText>
                                                        </>
                                                                                 
                                                    ) 
                                                }}
                                                />  
                                            </Grid>
                                            
                                        )
                                    })
                                }
                        </Grid>
                    
                        <Grid item container direction="row" justifyContent="flex-start">
                            <Grid item>
                                <Button disabled={Object.keys(errors).length > 0} sx={{top: "-2px"}} size="large" type="submit" variant="outlined">Ricerca</Button>                       
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>

    )
}

export default SearchForm;