import { Grid } from "@mui/material"
import LoginForm from "../Components/LoginForm"
import SnackbarComponent from "../Components/SnackbarComponent"

const LoginPage = () => {
    return(
        <Grid container direction="column" justifyContent="center">
            <Grid item>
                <LoginForm />
            </Grid>
        </Grid>
    )
}

export default LoginPage