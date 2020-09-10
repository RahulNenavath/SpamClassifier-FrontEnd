import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Form from './Form'
import CardHeader from '@material-ui/core/CardHeader';


class FormCard extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            smsText: '',
            pred: '',
            conf: '',
        }

    }

    getResponse (sms, prediction, confidence, newPred){
        this.setState({
            smsText:sms,
            pred:prediction,
            conf: confidence,
            newPrediction: newPred
        })

        this.props.collectRespone(this.state.smsText,this.state.pred, this.state.conf)
    }

    render(){
        return(
            <Card className='cardroot'>
            <CardHeader
            title={this.props.title}
            subheader={this.props.subtitle}
          />
          <CardContent>
              <Form trigger={this.getResponse.bind(this)}/>
          </CardContent>
        </Card>   
        )
    }

}

export default FormCard

