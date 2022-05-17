import Header from './Header';
import SnackbarComponent from './SnackbarComponent';
import ResponseData from './ResponseData';
import Form from './Form';
import { Grid } from '@mui/material';

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const Page = () => {
  return (
        <Grid container direction="column" justifyItems="start" justifyContent="space-around" rowSpacing={5} wrap="nowrap">
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                <SnackbarComponent severity="errorData"/>
            </Grid>
            <Grid item>
                <Form />
            </Grid>
            <Grid item>
                <ResponseData type={"password"} value={"ac5r2ss0"}/>
            </Grid>
        </Grid>
  );
}

export default Page;
