import { Button, Container, FormHelperText, Grid } from "@mui/material";
import{ useEffect, useLayoutEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FieldsProperties, FieldsProps, FormField, MenuItems } from "./FormFields";
import moment from 'moment';
import apiRequests from "../api/apiRequests";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, 
    getPersonBasicDataType, getPersonsLogsType } from "../api/apiRequestTypes";
import * as snackbarActions from "../redux/snackbarSlice";
import * as responseActions from "../redux/responseSlice";
import * as spinnerActions from "../redux/spinnerSlice";
import { useDispatch } from 'react-redux';

/**
 * default values of the form fields
 */
const defaultFormValues: {[key: string]: any } = {
    "ticketNumber": "",
    "taxId": "",
    "personId": "",
    "iun": "",
    "ipaCode": "",
    "referenceMonth": moment().format("YYYY-MM"),
    "Tipo Estrazione": "Ottieni EncCF",
    "recipientType": "PF",
    "deanonimization": false,
    "Date Picker": moment().format("YYYY-MM-DD"),
    "Time interval": [moment().subtract(90, 'days').format("YYYY-MM-DD"), moment(new Date).format("YYYY-MM-DD")],
    "traceId": ""
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
     * helps for watching the touched field and handle changes of them in the Otteni log completi case
     */
    const [prevDirtyFields, setPrevDirtyFields] = useState<string[]>([])
    
    const dispatch = useDispatch();

    /**
     * form functionalities from react-hook-forms
     */
    const { handleSubmit, control, watch, formState: { errors, isDirty, touchedFields, dirtyFields }, reset, resetField, getValues} = useForm({
        mode: 'onSubmit',
        defaultValues: defaultFormValues
    });

    /**
    * used for watching all fields when changing 
    */
    const watchAllFields = useWatch({name: MenuItems[selectedValue], control});
    
    /**
    * used for watching Tipo Estrazione select menu 
    */
    const watchTipoEstrazione = useWatch({name: "Tipo Estrazione", control,})


     /**
     * function handling changes of the Tipo Estrazione select menu
     * @param {SelectChangeEvent<string>} e the event of the field 
     */
    useEffect(() => {
        const values = getValues();
        setSelectedValue(values["Tipo Estrazione"].toString());
        setFields(filterFields(MenuItems[values["Tipo Estrazione"].toString()]));
        reset({...defaultFormValues, "Tipo Estrazione": values["Tipo Estrazione"]});
        resetStore();
    }, [watchTipoEstrazione])

    useLayoutEffect(() => () => {
        resetStore();
    }, [])

 
    /**
     * function handling the changes in the fields when the selected value of Tipo Estrazione is
     * "Ottieni log completi" so some fields are hidden and some are shown according
     * to which fields are filled 
     */
    useEffect(() => {
        let neededFields: string[] = []
        if(Object.keys(dirtyFields).sort().join("") === prevDirtyFields.sort().join("")){
            return;
        }
        if(selectedValue === "Ottieni log completi" ){
            if(Object.keys(dirtyFields).length == 0 || (Object.keys(dirtyFields).length == 1 && 
                ["Deanonymization Checkbox", "ticketNumber"].includes( Object.keys(dirtyFields)[0]))){
                neededFields = MenuItems["Ottieni log completi"].filter(item => item != "deanonimization");
            }else{
                if(Object.keys(dirtyFields).includes("Time interval")){
                    neededFields = ["ticketNumber", "taxId", "Time interval", "personId"];
                }
                if(Object.keys(dirtyFields).includes("taxId")){
                    neededFields = ["ticketNumber", "taxId", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("personId")){
                    neededFields = ["ticketNumber", "personId", "Time interval"];
                }
                if(Object.keys(dirtyFields).includes("iun")){
                    neededFields = ["ticketNumber", "iun", "deanonimization"];
                }           
            }
            if(neededFields.sort().join('|') != fields.map(field => field.name).sort().join('|')){
                setFields(filterFields(neededFields));
            }
        }
        setPrevDirtyFields(Object.keys(dirtyFields));
    }, [watchAllFields])


    /**
     * 
     * @param {string[]} neededFields needed fields in the situation just as names 
     * @returns {FieldsProps[]} needed fields with their specific properties ready for creating 
     */
    const filterFields = (neededFields:string[]): FieldsProps[] => {
        const allFields = Object.values(FieldsProperties);
        return allFields.map(field => (neededFields.includes(field.name) || field.name == "Tipo Estrazione" ?
                    field :
                    hideField(field)
                    ));
    }

    /**
     * function that changes the hide propety a field
     * @param field field to be hidden
     * @returns the hiddin field
     */
    const hideField = (field: FieldsProps) => {
        resetField(field.name);
        return { ...field, hidden: true }
    }   

    /**
     * handling form submit
     * @param data values from the form
     */
    const onSubmit = (data: any) => {
        resetStore();
        dispatch(spinnerActions.updateSpinnerOpened(true));
        const payload = createPayload(data);
        if(selectedValue === "Ottieni EncCF" || selectedValue === "Ottieni CF"){
            createRequest(payload);
        }else{
            apiRequests.getLogsPasswords()         
            .then((res: any) => {
                payload.password = res.data.password;
                createRequest(payload);
            })
            .catch(error => {
                updateSnackbar(error.response);
            })
        }
        
    }

    /**
     * Formatting the data ready to be sent
     * @param data data that has to be formatted
     * @returns formatted payload 
     */
    const createPayload = (data: any): any => {
        const currentFields = fields
                            .filter(field => !field.hidden && field.name != "Tipo Estrazione")
                            .map(field => field.name);
        let payload = Object.assign(
            Object.keys(data)
            .filter((key) => currentFields.includes(key))
            .reduce((obj, key) => {
                return Object.assign(obj, {
                [key]: data[key]
                });
        }, {})
        );
        if(payload["Time interval"]){
            payload.dateFrom = payload["Time interval"][0];
            payload.dateTo = payload["Time interval"][1];
            delete payload["Time interval"]
        }
        return payload;
    }
    
    /**
     * Create request depending on the use case
     * @param payload the request paylod
     */
    const createRequest = (payload: any) => {
        let request = undefined;
        switch (selectedValue) {
            case "Ottieni EncCF":
            case "Ottieni CF":
                request = apiRequests.getPersonBasicData(payload as getPersonBasicDataType)
                break;
            case "Ottieni notifica": 
                request = apiRequests.getNotificationsInfoLogs(payload as getNotificationsInfoLogsType)
                break;            
            case "Ottieni notifiche di una PA": 
                request = apiRequests.getNotificationsMonthlyStatsLogs(payload as getNotificationsMonthlyStatsLogsType)
                break;            
            case "Get process logs": 
                request = apiRequests.getLogsProcesses(payload as getLogsProcessesType)
                break;            
            case "Ottieni log completi": 
                request = apiRequests.getPersonsLogs(payload as getPersonsLogsType)
                break;            
            default:
                break;
        }
        if(request){
            request.then(res => {
                    updateSnackbar(res);
                    updateResponse(payload.password ? {password: payload.password} : res.data);
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                })
                .catch(error => {
                    updateSnackbar(error.response);
                    dispatch(spinnerActions.updateSpinnerOpened(false));
                }) 
        }  
        
    }

    /**
     * update the snackbar component depneding on the response
     * @param response 
     */
    const updateSnackbar = (response: any) => {
        dispatch(snackbarActions.updateSnackbacrOpened(true))
        dispatch(snackbarActions.updateStatusCode(response.status))
    }

    /**
     * update the response data component depending on the response
     * @param response 
     */
    const updateResponse = (response: any) => {
        dispatch(responseActions.updateResponseOpened(true))
        dispatch(responseActions.updateResponseData(response))
    }

    /**
     * reset the state of the redux store
     */
    const resetStore = () => {
        dispatch(snackbarActions.resetState());
    }

    return(
        <Container>
            <Grid container direction="column" rowSpacing={4} sx={{border: "2px black dotted", padding: "5%"}}>
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
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
                                                                errors[field.name].message 
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
