import React from "react";
import Header from '../Components/Header';
import SearchForm from '../Components/Forms/SearchForm';
import { Backdrop, Grid } from '@mui/material';
import { opened } from "../redux/spinnerSlice";
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';
import { refreshToken } from '../Authentication/auth';

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const SearchPage = ({ email }: any) => {

  const openedSpinner = useSelector(opened);

  useEffect(() => {
    const interval = setInterval(async() => {
        await refreshToken().then(res => console.log(res))
    }, 3540000);
    // 3540000 = 59 minutes
    return () => clearInterval(interval); 
  }, [])

  return (
        <Grid container direction="column" justifyItems="start" justifyContent="space-around" rowSpacing={3} wrap="nowrap">
            <Grid item>
                <Header email={email}/>
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
