import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import Routes from './routes';

export default function App() {

    return (
      <div className="App">
        <Grid container direction='column'>
          <Grid item xs={12}>
            <Header/>
          </Grid>

          <Grid item container direction='row'>
            <Grid item xs={0} sm={2}/>
            <Grid item xs={8}>
              <Grid item>
                <Routes/>
              </Grid>
            </Grid>
            <Grid item xs={0} sm={2} />
          </Grid>
        </Grid>
      </div>
    );
  }