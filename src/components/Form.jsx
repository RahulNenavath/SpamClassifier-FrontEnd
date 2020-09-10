import React from 'react'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sms: '',
            smsFeildError: '',
            prediction: '',
            confidence: '',
        }

    }

    validate = () => {

        if (this.state.sms.length === 0){
            this.setState({smsFeildError:'SMS is required'})
            return false
        }
        return true

    }
    
    change = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const isValid = this.validate()
        if (isValid){
            this.setState({
                smsFeildError:''
            })
            const payload= {sms:this.state.sms}
            const smsPayload = this.state.sms
            this.setState({
                sms: ''
            })

            axios.post('http://172.17.0.2:8000/predict',payload)
            .then(response => {
                console.log(response)
                this.setState({
                    prediction: response.data.prediction,
                    confidence: response.data.confidence
                })

                this.props.trigger(smsPayload,this.state.prediction, this.state.confidence)
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    render(){
        return(
        <form>
            <textarea className='textArea'
                name='sms'
                placeholder='Plese paste sms here'
                value={this.state.sms} 
                onChange={e => this.change(e)}
                rows={30}
            />
            <br/>
            <div style={{color:'red'}}>{this.state.smsFeildError}</div>
            <br/>
            <Button
                fullWidth='true'
                className='sendButton'
                variant="contained"
                color="primary"
                endIcon={<SendIcon/>}
                onClick={e => this.onSubmit(e)}>
                    Predict
            </Button>
        </form>
        )
    }
}

export default Form