import React, {useState} from 'react';
import firebase from "../config/firebase";
import {Auth} from "../context/authContext";
import { Link, Redirect } from 'react-router-dom';
import { TextField, Button, makeStyles, Grid } from '@material-ui/core';
import Loader from './loading';

const useStyles = makeStyles(theme => ({
  root: {
    '$ .MuiFormControl-root':{
      width:'80%',
      margin: theme.spacing(3),
    }
  }
}))

const buttonStyles = {
  marginRight:'10px',
}

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [routeRedirect, setRouteRedirect] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const {state, dispatch} = React.useContext(Auth);

  const classes = useStyles();

  const login = async (e) => {
    e.preventDefault();
    setIsLoding(true)
    let response = await firebase.login(email,password);
    if (response.hasOwnProperty("message") ){
      alert(response.message)
    }else{
      // console.log(response.user);
      setRouteRedirect(true);
      return dispatch({
        type:"LOGIN",
        payload: response.user
      });
    }
  }

  const redirect = routeRedirect;
  if(redirect){
    return <Redirect to='/' />
  }

  return(
    <React.Fragment>
      <h3>Login Form:</h3>
      <form onSubmit={login} className={classes.root}>
        <Grid container direction='column' spacing={2}>
          <Grid item xs = {12}>

          </Grid>
          <Grid item xs = {12}>
            <TextField
              variant="outlined"
              label="Email"
              fullWidth = "true"
              required id="standard-required"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>
          <Grid item xs = {12}>
          <TextField
            variant="outlined"
            label="Password"
            required id="standard-required"
            type="password"
            fullWidth = "true"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
          </Grid>
          <Grid item xs = {12}>
            <Grid container direction='row' spacing={2}>
              <Grid item xs = {6}>
              <Button variant="outlined" color="primary" style={buttonStyles} type="submit" fullWidth="true"> Submit</Button>
              </Grid>
              <Grid item xs = {6}>
              <Link to="/">
            <Button variant="outlined" color="primary" styles={buttonStyles} fullWidth="true">check without logging in</Button>
          </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isLoding ? <Loader/> : null}
      </form>
    </React.Fragment>
  )
}

export default Login;