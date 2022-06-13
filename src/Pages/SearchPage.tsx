import Header from '../Components/Header';
import SearchForm from '../Components/SearchForm';
import { Backdrop, Grid } from '@mui/material';
import { opened } from "../redux/spinnerSlice";
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Footer from '../Components/Footer';

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
                <Footer />
            </Grid>
        </Grid>
  );
}

export default SearchPage;
