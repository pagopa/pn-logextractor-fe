import Header from '../Components/Header';
import SnackbarComponent from '../Components/SnackbarComponent';
import ResponseData from '../Components/ResponseData';
import SearchForm from '../Components/SearchForm';
import { Grid } from '@mui/material';

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const SearchPage = () => {
  return (
        <Grid container direction="column" justifyItems="start" justifyContent="space-around" rowSpacing={5} wrap="nowrap">
            <Grid item>
                <Header />
            </Grid>
            <Grid item>
                <SnackbarComponent />
            </Grid>
            <Grid item>
                <SearchForm />
            </Grid>
            <Grid item>
                <ResponseData />
            </Grid>
        </Grid>
  );
}

export default SearchPage;
