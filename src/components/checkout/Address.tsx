import React, { CSSProperties } from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { customerInfo } from './../../typings'
//import Button from '@material-ui/core/Button';

/* const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
); */

const styles = {
  errorColor: {
    color: 'red'
  },
  noErrorColor:{
    color: 'primary'
  }
};

interface Props {
  onSubmit: (customerInfo: customerInfo) => void
}



export class AddressForm extends React.Component<Props, customerInfo> {

  constructor(props: Props) {
    super(props)
    this.state = {
      //errorColor: 'noErrorColor',
      firstName: '',
      error: false,
      firstNameError: '',
      lastName: '',
      address: '',
      zipCode: 0,
      city: '',
      email: '',
      mobile: 0,

      shippingMethod:'',
      deliveryDate:'',
      shippingCost: ''
    }
  }

   validateInput = () =>{
    
    let isError = false
    const errors = {firstNameError:'', error: false};

    if(this.state.firstName.length < 5){
      isError = true
      //errors.errorColor = 'errorColor'
      errors.firstNameError = 'too short username'
      errors.error = true
      
    }

    if(isError){
      this.setState({
        ...this.state,
        ...errors,
      })
    }
    return isError
  }

  private onSubmit = () => {
    const err = this.validateInput()
    //VALIDATE HERE
    if(!err){
      this.props.onSubmit(this.state)
    }
    
  }

  private handleShipmentInput = (event: { target: { value: any } }) => { 
    this.setState({shippingMethod: event.target.value})
    this.setShipmentDetails(event.target.value)
    }

  private setShipmentDetails = (shipping:string) =>{
    console.log(this.state.shippingMethod)
        
    if(shipping === 'PostNord Express'){
        this.setState({deliveryDate:'24h från nu'})
        this.setState({shippingCost: 99})
        
        }
    else if(shipping === 'PostNord Basic'){
        this.setState({deliveryDate:'4dagar'})
        this.setState({shippingCost: 39})
        
    }
    else{
        this.setState({deliveryDate:'ha ha ha...'})
        this.setState({shippingCost: 0})
       
    }
}

  render(){ 
    
    
    return (
      <>
          <form autoComplete="on" >
            <TextField id="standard"  error = {this.state.error} label="Förnamn" value={this.state.firstName} helperText = {this.state.firstNameError} onChange={(event) => { this.setState({ firstName: event.target.value }) }} />
            <TextField id="standard-basic" color="secondary" label="Efternamn" value={this.state.lastName} onChange={(event) => { this.setState({ lastName: event.target.value }) }}/>
            <br/>
            <TextField id="standard-basic" color="secondary" label="Adress" style = {{width:'52ch'}} value={this.state.address} onChange={(event) => { this.setState({address: event.target.value}) }}/>
            <br/>
            <TextField id="standard-basic" color="secondary" label="Postnummer" value={this.state.zipCode} onChange = {(event) => { this.setState({ zipCode: event.target.value }) }}/>
            <TextField id="standard-basic" color="secondary" label="Ort" value={this.state.city} onChange ={(event) => { this.setState({ city: event.target.value }) }}/>
            <br/>
            <TextField id="standard-basic" color="secondary" label="E-Mail" value={this.state.email} onChange ={(event) => { this.setState({ email:event.target.value }) }} />
            <TextField id="standard-basic" color="secondary" label="Mobile" value={this.state.mobile} onChange ={(event) => { this.setState({ mobile: event.target.value }) }}/>
          
          </form>

          <FormLabel component="legend">Betalsätt</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value = {this.state.shippingMethod} onChange = {this.handleShipmentInput}>
            <h3>PostNord Express!</h3>
            <p>Leverans 24h. Pris: 99kr </p>
            <FormControlLabel
              value="PostNord Express" 
              control={<Radio />} 
              label="PostNord Express"
               />

            <h3>PostNord Basic!</h3>
            <p>Leverans: 4 dagar. Pris: 39kr</p>
            <FormControlLabel
                value="PostNord Basic" 
                control={<Radio />} 
                label="PostNord Basic" />

            <h3>PostMord!</h3>
            <p>Leverans: Aldrig. Pris: Fri frakt </p>
            <FormControlLabel 
                value="PostMord" 
                control={<Radio />} 
                label="PostMord" />
          </RadioGroup>
  
          <Button
            type = 'submit'
            onClick={() => this.onSubmit()}
            variant="contained" 
            color="primary">
              Fortsätt 
          </Button>
      </>
    );
    
  }

}

export default withStyles(styles)(AddressForm);

/* const RedColor:CSSProperties = {
  color: 'red'
}

const noErrorColor:CSSProperties = {
  color: 'blue'
} */

