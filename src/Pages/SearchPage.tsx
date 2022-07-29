import React from "react";
import Header from '../Components/Header';
import SearchForm from '../Components/Forms/SearchForm';
import { Grid } from '@mui/material';
import { opened } from "../redux/spinnerSlice";
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { useEffect, useState } from 'react';
import { logout, refreshToken } from '../Authentication/auth';
import { useNavigate } from "react-router-dom";

/**
 * Component containing all objects of the app representing the whole page 
 * @component
 */
const SearchPage = ({ email }: any) => {

  const navigate = useNavigate();
  
  /* istanbul ignore next */
  useEffect(() => {
    const idTokenInterval = setInterval(async() => {
        await refreshToken().then(res => console.log("refreshing token:", res))
    }, 3540000);
    // 300000 = 5 minutes
    // 3 540 000 = 59 minutes
    const refreshTokenInterval = setInterval(async() => {
        await logout()
            .then(() => {
                navigate("/");
            })
            .catch((error: any) => {
                throw error;
            })
    }, 36000000);
    // 36 000 000 = 10 hours
    return () => {
        clearInterval(idTokenInterval);
        clearInterval(refreshTokenInterval);
    } 
  }, [])

  return (
        <Grid container direction="column" justifyItems="start" justifyContent="space-around" rowSpacing={3} wrap="nowrap">
            <Grid item>
                <Header email={email}/>
            </Grid>
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
