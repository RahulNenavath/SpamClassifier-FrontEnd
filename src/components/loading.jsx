import React from "react";
import Animation from '../loading.gif';

const gifStyles = {
    display:'block',
    height:'40%',
    width:'30%',
    alignItems:'center',
    justifyContent:'center',
    margin:'auto'
}

const Loader = () => (
    <React.Fragment>
        <img src={Animation} style={gifStyles } alt='Loader'/>
    </React.Fragment> );

export default Loader;

