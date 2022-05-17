import { Button, Container, Grid, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import{ useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { MenuItems, FormField, FieldsProperties, FieldsProps } from "./FormFields";

/**
 * default values of the form fields
 */
const defaultFormValues: {[key: string]: string} = {
    "Ticket Number": "",
    "Codice Fiscale": "",
    "Unique Identifier": "",
    "IUN": "",
    "IPA Code": "",
    "Month": "",
    "Time interval": "",
    "Tipo Estrazione": "Ottieni EncCF",
    "Person Radio Buttons": ""
}

/**
 * Generating the app form using the form fields
 * @component
 */
const FormApp = () => {

    /**
     * selected value of Tipo Estrazione select menu
     */
    const [selectedValue, setSelectedValue] = useState<string>(Object.keys(MenuItems)[0]);
    /**
     * the fields coresponding to the selected value
     */
    const [fields, setFields]  = useState<FieldsProps[]>(MenuItems[selectedValue].map(field => FieldsProperties[field]));
    /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, watch, formState, reset, getValues,  } = useForm({
        defaultValues: defaultFormValues
    });

    /**
    * used for watching all fields when changing 
    */
    const watchAllFields = useWatch({name: MenuItems[selectedValue], control});
    
    const watchTipoEstrazione = useWatch({name: "Tipo Estrazione", control})


     /**
     * function handling changes of the Tipo Estrazione select menu
     * @param {SelectChangeEvent<string>} e the event of the field 
     */
    useEffect(() => {
        const values = getValues();
        reset({...defaultFormValues, "Tipo Estrazione": values["Tipo Estrazione"]});
        setSelectedValue(values["Tipo Estrazione"]);
        setFields(MenuItems[values["Tipo Estrazione"]].map(field => FieldsProperties[field]));
        
    }, [watchTipoEstrazione])


    /**
     * function handling the changes in the fields when the selected value of Tipo Estrazione is
     * "Ottieni log completi" so some fields are hidden and some are shown according
     *  to which fields are filled 
     */
    useEffect(() => {
        let dirtyFields = formState.dirtyFields;
        let neededFields: string[] = []
        if(selectedValue === "Ottieni log completi"){
            if(Object.keys(dirtyFields).length == 0 || 
                (Object.keys(dirtyFields).length == 1 && Object.keys(dirtyFields).includes("Ticket Number"))){
                neededFields = MenuItems["Ottieni log completi"].filter(item => item != "Activity Path Radio Buttons");
            }else{
                if(Object.keys(dirtyFields).includes("Time interval")){
                    neededFields = ["Ticket Number", "Codice Fiscale", "Time interval", "Unique Identifier"];
                }
                if(Object.keys(dirtyFields).includes("Codice Fiscale")){
                    neededFields = ["Ticket Number", "Codice Fiscale", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("Unique Identifier")){
                    neededFields = ["Unique Identifier", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("IUN")){
                    neededFields = ["Ticket Number", "IUN", "Activity Path Radio Buttons"];
                }           
            }
            setFields(filterFields(fields, neededFields));
        }
    }, [watchAllFields])


    /**
     * 
     * @param {FieldsProps[]} allFields all fields for "Ottieni log completi" from MenuItems
     * @param {string[]} neededFields needed fields in the situation just as names 
     * @returns {FieldsProps[]} needed fields with their specific properties ready for creating 
     */
    const filterFields = (allFields:FieldsProps[], neededFields:string[]): FieldsProps[] => {
        let filterFields = allFields.map(field => (!neededFields.includes(field.name) 
                    ? { ...field, hidden: true } : {...field, hidden: false}));
        return filterFields;
    }

    return(
        <Container>
            <Grid container direction="column" rowSpacing={4}>
                <form onSubmit={handleSubmit(data => console.log(data))}>
                        <Grid container item direction="column" rowSpacing={5}>
                            <Grid item container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <Controller
                                         control={control}
                                         name={"Tipo Estrazione"}
                                         render={({
                                             field: { onChange, onBlur, value, name, ref },
                                             fieldState: { invalid, isTouched, isDirty, error },
                                             formState,
                                         }) => (
                                             <FormField key="Tipo Estrazione" value={selectedValue} onChange={onChange} field={FieldsProperties["Tipo Estrazione"]}/>
                                         )}
                                         />
                                </Grid>  
                                {
                                    fields.map(item => {
                                        return (
                                            !item.hidden &&
                                            
                                            <Controller
                                                key={item.name}
                                                control={control}
                                                name={item.name}
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <FormField key={item.name} value={value} onChange={onChange} field={item}/>
                                                )}
                                                />
                                        )
                                    })
                                }
                        </Grid>
                    
                        <Grid item container direction="row" justifyContent="flex-start">
                            <Grid item>
                                <Button sx={{top: "-2px"}} size="large" type="submit" variant="outlined">Ricerca</Button>                       
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>

    )
}

export default FormApp;