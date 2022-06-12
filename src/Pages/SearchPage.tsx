import Header from '../Components/Header';
import SnackbarComponent from '../Components/SnackbarComponent';
import ResponseData from '../Components/ResponseData';
import SearchForm from '../Components/SearchForm';
import { Backdrop, Grid } from '@mui/material';
import { opened } from "../redux/spinnerSlice";
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const SearchPage = () => {

  const openedSpinner = useSelector(opened);

  return (
        <Grid container direction="column" justifyItems="start" justifyContent="space-around" rowSpacing={5} wrap="nowrap">
            <Grid item>
                <Header />
            </Grid>
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openedSpinner}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item>
                <SearchForm />
            </Grid>
            <Grid item>
                <ResponseData />
            </Grid>
            <Grid item>
                <SnackbarComponent />
            </Grid>
        </Grid>
  );
}

export default SearchPage;
