import { Grid, Button, Box, FormLabel, Card } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FieldsProperties, FormField } from "./FormFields";

/**
 * default values of the form fields
 */
const defaultFormValues: {[key: string]: string} = {
    "email": "",
    "password": "",
}

/**
 * Generating the login form using the form fields
 * @component
 */
const LoginForm = () => {
    const { handleSubmit, control, watch, formState, reset, getValues,  } = useForm({
        defaultValues: defaultFormValues
    });

    const navigate = useNavigate();

    /**
     * function handling the form submitting
     * @param data the data from the form
     */
    const onSubmit = (data: { [x: string]: string; }) => {
        console.log(data);
        navigate("/search");
    }

    return(
        <Box 
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card elevation={24} sx={{ width: 1/2, padding: "5%", boxShadow: "0px 3px 3px -2px "}}>
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <FormLabel sx={{fontWeight: "bold", color: "#0073e6", fontSize: "2.125rem"}} component="legend">LOGIN</FormLabel>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <Controller 
                                control={control}
                                name={"email"}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <FormField key={"email"} field={FieldsProperties["Email"]} onChange={onChange} value={value}/>
                                )}
                            />
                        </Grid>
                        <Grid item>
                            <Controller 
                                control={control}
                                name={"password"}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { invalid, isTouched, isDirty, error },
                                    formState,
                                }) => (
                                    <FormField key={"password"} field={FieldsProperties["Password"]} onChange={onChange} value={value}/>
                                )}
                            />
                        </Grid>
                        <Grid item>
                            <Button fullWidth size="large" type="submit" variant="outlined">Login</Button>                       
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    )
}

export default LoginForm;