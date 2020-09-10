import React from 'react'
import { Grid } from '@material-ui/core';
import FormCard from './FormCard'
import PredictionCard from './PredCard'

class MainPanel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            smsText: '',
            pred: '',
            conf: '',
            predcard: false,
            newPrediction: false
        }
    }

    getResponse (sms, prediction, confidence, newPred){
        this.setState({
            smsText:sms,
            pred: prediction,
            conf: confidence,
            predcard: true,
        })
    }

    render(){
        return(
            <Grid container direction='column'>
                <Grid item xs={12}>
                    <h2>SMS SPAM CLASSIFIER</h2>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <br/>
                    <Grid container spacing={4}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <FormCard title={'Check SMS: '} 
                            subtitle={'Paste the sms below and know whether the sms is spam or ham'}
                            collectRespone={this.getResponse.bind(this)}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            {this.state.predcard ? <PredictionCard 
                                                        title={'Prediction:'} 
                                                        subtitle={'Find the prediction score below'} 
                                                        sms = {this.state.smsText}
                                                        prediction = {this.state.pred} 
                                                        confidence={this.state.conf}/>
                                                        :
                                                     null}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default MainPanel;