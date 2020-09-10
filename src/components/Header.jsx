import React, {useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import {Link, withRouter} from "react-router-dom";
import {Auth} from "../context/authContext"
import firebase from "../config/firebase";

const Header = (props) => {
    const logoStyles = {
        width:'60px', 
        height:'50px', 
        textAlign:'center',
        paddingRight:'20px' 
      }
      const typographyStyles = {
          flex:'1'
      }

      const userEmailStyles = {
          paddingRight: "10px"
      }

    const buttonStyles = {
        marginRight:'10px'
    }

    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    const {state, dispatch} = React.useContext(Auth);

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
                setUserEmail(user.email);
            }
        });
    });

    const logout = () => {
        firebase.logout();
        setUserState(null);
        props.history.replace("/login")
        return dispatch({
            type: "LOGOUT",
            payload: {}
        });
    }

    let buttons;

    if(userState != null || state.user.hasOwnProperty("user")){
        buttons = (
        
        <React.Fragment>
            <Typography style={userEmailStyles}>
                <p style={{color:'black'}}>{userEmail}</p>
            </Typography>

            <Button variant="outlined" color="primary" style={buttonStyles} onClick={logout}> Logout</Button>
        </React.Fragment>
        )
    }else{
        buttons = (
            <React.Fragment>
                <Link to="/login">
                    <Button variant="outlined" color="primary" style={buttonStyles}> Login</Button>
                </Link>
    
                <Link to='/register'>
                    <Button variant="outlined" color="primary" style={buttonStyles}> Register</Button>
                </Link>
            </React.Fragment>
        )
    }
 
    return(
        <AppBar position='static'>
            <Toolbar style={{ background: '#FFFFFF' }}>
            <a href='/'>
            <img src={require('../spam.png')} alt='spamlogo' style={logoStyles}/>
            </a>
                <Typography style={typographyStyles}>
                    <p style={{color:'black'}}>SPAM CLASSIFIER</p>
                </Typography>
                {buttons}

            </Toolbar>
        </AppBar>
    )
};

export default withRouter(Header);