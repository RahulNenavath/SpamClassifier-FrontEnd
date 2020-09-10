import React, {useState, useEffect} from 'react';
import firebase from "../config/firebase";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from '@material-ui/core/Button';

const textStyle = {
  textAlign:'center'
}

const PredictionCard = (props) => {

    const {title, subtitle, sms, prediction, confidence} = props

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [reported, setReported] = useState(false);

    useEffect(() => {
      firebase.getUserState().then(user => {
          if(user){
            setIsLoggedIn(true)
            setUserEmail(user.email)
          }
      });
  });

  const textStyles = {
    textAlign : "center"
  }

  const postMisclassifiedInstance = async(e) => {

    let data = {
      "email":userEmail,
      "sms":sms
    }
    
    await firebase.createPost(data).then( () => {
      console.log("Misclassification reported")
    }).catch(err => {
      console.log(err)
    })
    setReported(true)
  }

    const scoreStyles = {
        color:'red',
        fontFamily: 'system-ui',
        textAlign: 'center'
      }

        return(
            <Card className='cardroot'>
            <CardHeader
            title={title}
            subheader={subtitle}
          />
          <CardContent>
              <h1 style={scoreStyles}>{prediction.toUpperCase()}</h1>
              <h4 style={{textAlign:'center'}}><p style={{color:'#A2D61F'}}>Confidence of being spam: </p>{confidence}</h4>
      
              {isLoggedIn ? <div><Button
                fullWidth='true'
                className='sendButton'
                variant="contained"
                color="primary"
                endIcon={<NotificationsActiveIcon/>}
                onClick={postMisclassifiedInstance}
                >
                  Report Misclassification
            </Button> {reported ? <p style={textStyles}>Reported sucessfully</p> : null} </div>: <p style={textStyle}> <b>Misclassification can be reported when logged in</b></p>}

          </CardContent>

        </Card>   
        )
    }

export default PredictionCard